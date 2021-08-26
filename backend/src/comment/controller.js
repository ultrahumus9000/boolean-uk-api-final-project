const { comment } = require("../../database");
const { errorHandler } = require("../helper");

async function getAllcomments(req, res) {
  try {
    const result = await comment.findMany();
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function commentOnecomment(req, res) {
  const currentUser = req.currentUser;
  try {
    const commentInfo = await comment.create({
      data: {
        ...req.body,
        userId: currentUser.id,
      },
    });
    res.json(commentInfo);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function deleteOnecomment(req, res) {
  const id = Number(req.params.id);
  try {
    await comment.delete({
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
  getAllcomments,
  commentOnecomment,
  deleteOnecomment,
};
