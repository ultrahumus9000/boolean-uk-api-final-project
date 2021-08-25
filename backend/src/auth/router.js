const authRouter = require("express").Router();
const { validateUser } = require("./controller");
authRouter.post("/login", validateUser);

module.exports = authRouter;
