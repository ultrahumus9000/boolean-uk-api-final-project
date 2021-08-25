const userRouter = require("express").Router();

const {
  getAllUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
  findPostsByUserId,
} = require("./controller");
userRouter.get("/", getAllUser);
userRouter.get("/:userId", findPostsByUserId);
userRouter.post("/", postOneUser);
userRouter.patch("/:id", editUserProfile);
userRouter.delete("/:id", deleteOneUser);

module.exports = userRouter;
