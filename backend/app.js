var express = require("express");
var logger = require("morgan");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const userRouter = require("./src/user/router");
const postRouter = require("./src/post/router");
const commentRouter = require("./src/comment/router");
const tagRouter = require("./src/tags/router");
const authRouter = require("./src/auth/router");
const { validateToken } = require("./authgenerator");
var app = express();

app.use(cors({ credentials: true, origin: "http://localhost:3001" }));

app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(authRouter);

app.use((req, res, next) => {
  const { token } = req.cookies;

  const userInfo = token && validateToken(token);
  console.log("token", token);
  console.log("validate", validateToken(token));
  console.log("userinfo", userInfo);
  if (userInfo) {
    req.currentUser = userInfo;
    next();
  } else {
    res.json("you aren't the user");
  }
});

app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/tags", tagRouter);

app.all("*", (req, res) => {
  res.status(404).json("No route match");
});

module.exports = app;
