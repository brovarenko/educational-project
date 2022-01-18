const authController = require("../controllers/authController.js");
const express = require("express");
const authRouter = express.Router();
const authmiddleware = require('../middleware/authmiddleware')
const rolemiddleware = require('../middleware/rolemiddleware')
const {check} = require('express-validator')

authRouter.post("/register",
[check('email','Некорректный email').isEmail(),
check('password','Минимальная длина пароля 6 символов').isLength({min:4})]
,authController.register);

authRouter.get("/register",rolemiddleware(['Admin']),authController.RegisterForm)
authRouter.get("/login",authController.LoginForm)

authRouter.post('/login',
  [check('email','Введите правильный email').normalizeEmail().isEmail(),
  check('password','Введите пароль').exists()]
,authController.login)

authRouter.use("/delete/:id", authController.deleteUser)
authRouter.get("/getuser", authController.getUsers)


  module.exports = authRouter;