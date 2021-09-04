var express = require("express");
var router = express.Router();
const {
  getUserById,
  allUsers,
  resetPassword,
  updateUser,
} = require("../controllers/usersController");
const { logIn, signUp } = require("../controllers/authController");

/* GET users listing. */
router.get("/allUsers", allUsers);

router.post("/logIn", logIn);

router.post("/signUp", signUp); //ruta para nuevo usuario.

router.get("/:id", getUserById);

router.put("/resetPassword", resetPassword); //testar luego de

router.put("/updateUser", updateUser);

module.exports = router;
