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

    // const token = createToken({
    //   id: userInfo.id,
    //   username: userInfo.username,
    // });

    // This creates a cookie that can't be accessed by Javascript in the Frontend
    // httpOnly: true
    // res.cookie("token", token, { httpOnly: true });

    res.json(userInfo);
  } catch (error) {
    console.log(error);
    res.json(error.message);
  }
}

async function editUserProfile(req, res) {
  const currentUser = req.currentUser;
  try {
    if (await idExsitingchecker(user, userId)) {
      const result = await user.update({
        where: {
          id: currentUser.id,
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
  const currentUser = req.currentUser;
  try {
    await user.delete({
      where: {
        id: currentUser.id,
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
  editUserProfile,
  deleteOneUser,
  findPostsByUserId,
  postOneUser,
};
