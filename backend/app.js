var express = require("express");

var logger = require("morgan");

const userRouter = require("./src/user/router");

var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use("/users", userRouter);

module.exports = app;
