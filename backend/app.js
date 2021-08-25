var express = require("express");
var logger = require("morgan");
var cors = require("cors");

const userRouter = require("./src/user/router");
const postRouter = require("./src/post/router");
const commentRouter = require("./src/comment/router");
const tagRouter = require("./src/tags/router");
const authRouter = require("./src/auth/router");
var app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(logger("dev"));
app.use(express.json());

app.use("/login", authRouter);

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/tags", tagRouter);

app.all("*", (req, res) => {
  res.status(404).json("No route match");
});

module.exports = app;
