const { post } = require("../../database");

async function getPostsByTag(req, res) {
  try {
    const result = await post.findMany({
      where: {
        tags: {
          some: {
            tag: {
              type: req.body,
            },
          },
        },
      },
    });
    result.json(result);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}


module.exports = getPostsByTag;
