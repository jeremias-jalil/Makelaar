const { User } = require("../db"); //falta conectarlo en db
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");


//auth0: permite terciarizar signIn logIn --> investigar
//token

module.exports={
    //LogIn
   async logIn(req, res){
  
    let {email,password}= req.body;

try{
    //Buscar user
   let user= await User.findOne({
        where:{
            email: email
        }
    })

    if(user){
        res.status(404).json({msg:"Usuario con este correo no encontrado"})
    }else{
        //comparo las contraseñas
        if(bcrypt.compareSync(password, user.password)){
        
            //creamos el token
        let token = await jwt.sign({user:user}, authConfig.secret, {expiresIn: authConfig.expires} );

         res.json({
            user: user,
            token: token
        })

        }else{
            //acceso no autorizado
           return res.status(401).json({msg:"Contraseña incorrecta"})
        }
    }

    }catch(err){
        console.log(err)
    }
},

    //registro
    async signUp(req,res){
try{
    //encriptamos pass
    let password= await bcrypt.hashSync(req.body.password,Number.parseInt(authConfig.rounds))

    //crear usuario, a traves de formulario de front
   let user= await User.create({
        name: req.body.name,
        email:req.body.email,
        password: password
    })
//creamos el token
    let token =  await jwt.sign({user:user}, authConfig.secret, {expiresIn: authConfig.expires} );

    res.json({
        user:user,
        token: token
    })


}catch(err){
    console.log(err)
}
    }

}