const { tag } = require("../../database");

const tagRouter = require("express").Router();

// const getPostsByTag = require("./controller");

// postRouter.get("/?tag=tag", getPostsByTag);

const {
  getTagsTypes,
  getAlltags,
  createOnetag,
  deleteOnetag,
  getOnePostAllTags,
} = require("./controller");

tagRouter.get("/types", getTagsTypes);
tagRouter.get("/", getAlltags);
tagRouter.post("/", createOnetag);
tagRouter.get("/:id", getOnePostAllTags);
tagRouter.delete("/:id", deleteOnetag);

module.exports = tagRouter;
