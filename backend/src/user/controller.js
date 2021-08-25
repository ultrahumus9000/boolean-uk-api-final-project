const e = require("express");
const { user, archive } = require("../../database");
const { errorHandler, idExsitingchecker } = require("../helper");

const { create } = require("./service");

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
    const userInfo = await create(req.body);
    await archive.create({
      data: {
        userId: userInfo.id,
      },
    });

    res.json(userInfo);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
}

async function editUserProfile(req, res) {
  console.log(req.params.id);
  const userId = Number(req.params.id);
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
      throw new Error("there isnt the user you provided");
    }
  } catch (error) {
    console.log(error);
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
    res.json(error.message);
  }
}

async function findPostsByUserId(req, res) {
  const userId = Number(req.params.userId);
  try {
    if (await idExsitingchecker(user, userId)) {
      const result = await user.findUnique({
        where: {
          id: userId,
        },
        select: {
          posts: true,
        },
      });
      res.json(result.posts);
    } else {
      throw new Error("user doesnt exist");
    }
  } catch (error) {
    res.json(error.message);
  }
}

module.exports = {
  getAllUser,
  postOneUser,
  editUserProfile,
  deleteOneUser,
  findPostsByUserId,
};
