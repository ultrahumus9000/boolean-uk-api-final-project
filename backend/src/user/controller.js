const { user, archive } = require("../../database");
const { errorHandler, idExsitingchecker } = require("../helper");
async function getAllUser(req, res) {}

async function getOneUser(req, res) {}

async function postOneUser(req, res) {
  console.log("postuser", req.body);
  try {
    const userInfo = await user.create({
      data: req.body,
    });
    console.log("post create useinfo 13", userInfo);

    const result = await archive.create({
      data: {
        userId: userInfo.id,
      },
    });
    console.log("archive 20", result);
    res.json(userInfo);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

async function editUserProfile(req, res) {}

async function deleteOneUser(req, res) {
  const id = Number(req.params.id);
  try {
    await user.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

module.exports = {
  getAllUser,
  getOneUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
};
