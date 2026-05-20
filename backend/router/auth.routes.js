const { Router } = require("express");


const { protect } = require('../middleware/auth.protect.middleware');
const { register, login, logout, getMe, updateMe, changePassword } = require("../controller/auth.controller");
const { verify } = require("jsonwebtoken");
const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);
authRouter.post("/login",login)
authRouter.post("/logout" , protect ,logout)


authRouter.get('/me', protect, getMe);
authRouter.put('/me', protect, updateMe);
authRouter.put('/change-password', protect, changePassword);
module.exports = authRouter;

