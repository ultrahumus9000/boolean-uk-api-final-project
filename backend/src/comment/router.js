const commentRouter = require("express").Router();

const {
  getAllcomments,
  commentOnecomment,
  deleteOnecomment,
} = require("./controller");
commentRouter.get("/", getAllcomments);
commentRouter.post("/", commentOnecomment);
commentRouter.delete("/:id", deleteOnecomment);

module.exports = commentRouter;
