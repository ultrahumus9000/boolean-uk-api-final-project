const userRouter = require("express").Router();

const {
  getAllUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
  checkUser,
} = require("./controller");
userRouter.get("/", getAllUser);
userRouter.post("/", postOneUser);
userRouter.post("/user", checkUser);
userRouter.patch("/:id", editUserProfile);
userRouter.delete("/:id", deleteOneUser);

module.exports = userRouter;
