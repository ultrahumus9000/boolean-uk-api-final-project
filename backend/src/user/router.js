const userRouter = require("express").Router();

const {
  getAllUser,
  editUserProfile,
  deleteOneUser,
  findPostsByUserId,
} = require("./controller");
userRouter.get("/", getAllUser);
userRouter.get("/:userId", findPostsByUserId);
userRouter.patch("/", editUserProfile);
userRouter.delete("/", deleteOneUser);

module.exports = userRouter;
