const { tag } = require("../../database");

const tagRouter = require("express").Router();

// const getPostsByTag = require("./controller");

// postRouter.get("/?tag=tag", getPostsByTag);

const { getAlltags, createOnetag, deleteOnetag } = require("./controller");
tagRouter.get("/", getAlltags);
tagRouter.post("/", createOnetag);
tagRouter.delete("/:id", deleteOnetag);

module.exports = tagRouter;
