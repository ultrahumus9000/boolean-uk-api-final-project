var express = require("express");

var logger = require("morgan");
var cors = require("cors");

const userRouter = require("./src/user/router");
const postRouter = require("./src/post/router");
const commentRouter = require("./src/comment/router");
const tagRouter = require("./src/tags/router");
var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/tags", tagRouter);
app.all("*", () => {
  console.log("wrong path");
});

module.exports = app;
