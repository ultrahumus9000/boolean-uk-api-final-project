const postRouter = require("express").Router();

const getPostsByTag = require("./controller");

postRouter.get("/?tag=tag", getPostsByTag);
