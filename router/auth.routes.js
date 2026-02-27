const { Router } = require("express");

const { register, verify } =
  require("../controller/auth.controller");

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/verify", verify);

module.exports = authRouter;