const e = require("express");
const { user, archive } = require("../../database");
const { errorHandler, idExsitingchecker } = require("../helper");

async function getAllUser(req, res) {
  try {
    const result = await user.findMany();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function postOneUser(req, res) {
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

async function editUserProfile(req, res) {
  const userId = req.params.id;
  try {
    if (await idExsitingchecker(user, userId)) {
      const result = await user.update({
        where: {
          id: userId,
        },
        data: req.body,
      });

      res.json(result);
    } else {
      res.json("there isnt the user you provided");
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

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
  postOneUser,
  editUserProfile,
  deleteOneUser,
};
