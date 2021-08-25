const authRouter = require("express").Router();

const { validateUser } = require("./controller");

authRouter.post("/", validateUser);

module.exports = authRouter;
