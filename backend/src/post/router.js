const postRouter = require("express").Router();

const {
  getAllposts,
  postOnepost,
  deleteOnepost,
  updatePost,
} = require("./controller");
postRouter.get("/", getAllposts);

postRouter.post("/", postOnepost);
postRouter.patch("/:id", updatePost);
postRouter.delete("/:id", deleteOnepost);

module.exports = postRouter;
