const userRouter = require("express").Router();

const {
  getAllUser,
  getOneUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
} = require("./controller");
userRouter.get("/", getAllUser);
userRouter.get("/:id", getOneUser);
userRouter.post("/", postOneUser);
userRouter.patch("/:id", editUserProfile);
userRouter.delete("/:id", deleteOneUser);

module.exports = userRouter;
