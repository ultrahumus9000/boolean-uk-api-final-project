const userRouter = require("express").Router();

const {
  getAllUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
} = require("./controller");
userRouter.get("/", getAllUser);
userRouter.post("/", postOneUser);
userRouter.patch("/:id", editUserProfile);
userRouter.delete("/:id", deleteOneUser);

module.exports = userRouter;
