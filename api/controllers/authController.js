const { User } = require("../db"); //falta conectarlo en db
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");
const { sendUserEmail } = require("../email/userEmail");
const { newUser } = require("../email/emailModels/newUser");

async function logIn(req, res, next) {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(404).json({ msg: "Usuario con este correo no encontrado" });
    } else {
      if (bcrypt.compareSync(password, user.password)) {
        let token = await jwt.sign({ user: user }, authConfig.secret, {
          expiresIn: authConfig.expires,
        });

        res.json({
          user: user,
          token: token,
        });
      } else {
        return res.status(401).json({ msg: "Contraseña incorrecta" });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function signUp(req, res, next) {
  try {
    const { name, email, password, isAdmin, whatsapp } = req.body;
    let hashPassword = await bcrypt.hashSync(
      password,
      Number.parseInt(authConfig.rounds)
    );

    let userValidation = await User.findOne({ where: { email } });
    if (userValidation) {
      res.status(409).json({ msg: "Usuario existente" });
    } else {
      let user = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        isAdmin: isAdmin,
        whatsapp: whatsapp,
      });

      let token = await jwt.sign({ user: user }, authConfig.secret, {
        expiresIn: authConfig.expires,
      });

      sendUserEmail(newUser(user.name, user.email), user.email);

      res.json({
        user: user,
        token: token,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = { logIn, signUp };
