const authRouter = require("express").Router();

const { postOneUser } = require("../user/controller");
const { validateUser, logoutUser } = require("./controller");

authRouter.post("/login", validateUser);
authRouter.get("/logout", logoutUser);
authRouter.post("/signup", postOneUser);
module.exports = authRouter;
