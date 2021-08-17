var express = require("express");

var logger = require("morgan");
var cors = require("cors");

const userRouter = require("./src/user/router");

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/users", userRouter);

module.exports = app;
