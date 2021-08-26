const { post } = require("../../database");
const { errorHandler, idExsitingchecker } = require("../helper");

async function getAllposts(req, res) {
  try {
    const result = await post.findMany({});
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function postOnepost(req, res) {
  const currentUser = req.currentUser;
  try {
    const userInfo = await post.create({
      data: {
        ...req.body,
        userId: currentUser.id,
      },
    });
    res.json(userInfo);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function deleteOnepost(req, res) {
  const id = Number(req.params.id);
  console.log(id);
  try {
    await post.delete({
      where: {
        id,
      },
    });
    res.json("deleted!!!!!!!");
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

async function updatePost(req, res) {
  const postId = Number(req.params.id);
  console.log("update post", req.body);
  try {
    const orginalPost = await idExsitingchecker(post, postId);
    if (orginalPost) {
      const result = await post.update({
        where: {
          id: postId,
        },
        data: { ...orginalPost, ...req.body },
      });

      res.json(result);
    } else {
      res.json("there isnt the post you provided");
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

module.exports = {
  getAllposts,
  postOnepost,
  deleteOnepost,
  updatePost,
};
