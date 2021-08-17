const { user, archive } = require("../../database");
const { errorHandler, idExsitingchecker } = require("../helper");
async function getAllUser(req, res) {}

async function getOneUser(req, res) {}

async function postOneUser(req, res) {
  try {
    const userInfo = await user.create({
      data: req.body,
    });

    const result = await archive.create({
      data: {
        userId: userInfo.id,
      },
    });

    res.json(userInfo);
  } catch (error) {
    errorHandler(error);
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
    errorHandler(error);
  }
}

module.exports = {
  getAllUser,
  getOneUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
};
