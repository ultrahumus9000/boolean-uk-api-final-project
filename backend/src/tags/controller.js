const { post, tag, postToTag } = require("../../database");
const { errorHandler } = require("../helper");

async function getTagsTypes(req, res) {
  try {
    const result = await tag.findMany({
      select: {
        type: true,
      },
    });

    const modifiedResult = result.map((typeObj) => typeObj.type);
    res.json(modifiedResult);
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

async function getAlltags(req, res) {
  try {
    const result = await post.findMany({
      select: {
        id: true,
        posttotags: {
          select: {
            tag: {
              select: {
                type: true,
              },
            },
          },
        },
      },
    });

    const firstModifiedResult = await result.map((post) => {
      const newData = {
        postId: post.id,
        tags: post.posttotags,
      };
      return newData;
    });

    const secondModify = await firstModifiedResult.map((post) => {
      const tagsArray = post.tags.map((tagsinfo) => {
        return tagsinfo.tag.type;
      });
      const newData = {
        postId: post.postId,
        tags: tagsArray,
      };
      return newData;
    });
    res.json(secondModify);
  } catch (error) {
    console.log(error);
  }
}

async function createOnetag(req, res) {
  const { type, postId } = req.body;
  try {
    const tags = await tag.findMany();

    const tagtypes = tags.map((tagInfo) => tagInfo.type);

    if (tagtypes.includes(type)) {
      const findTag = tags.find((tagInfo) => tagInfo.type === type);

      const newTag = await postToTag.create({
        data: {
          postId,
          tagId: findTag.id,
        },
        // id     Int  @id @default(autoincrement())
        // post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
        // postId Int
        // tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)
        // tagId  Int
        include: {
          post: {
            select: {
              id: true,
            },
          },
          tag: {
            select: {
              type: true,
            },
          },
        },
      });

      // const tagResult = await tag.findUnique({
      //   where: {
      //     id: newTag.tagId,
      //   },
      // });

      res.json(newTag);
    } else {
      const tagInfo = await tag.create({
        data: {
          type,
        },
      });

      const newTagToPost = await postToTag.create({
        data: {
          postId,
          tagId: tagInfo.id,
        },
        include: {
          post: {
            select: {
              id: true,
            },
          },
          tag: {
            select: {
              type: true,
            },
          },
        },
      });

      res.json(newTagToPost);
      // res.json(tagInfo.type);
      // res.json(tagInfo);
    }
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}
async function deleteOnetag(req, res) {
  const id = req.params.id;
  try {
    const result = await postToTag.delete({
      where: {
        id,
      },
    });
    res.json("result is deleted");
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

async function getOnePostAllTags(req, res) {
  const postId = Number(req.params.id);

  try {
    const postToTagsInfo = await post.findUnique({
      where: {
        id: postId,
      },
      select: {
        posttotags: true,
      },
    });
    const tagIds = postToTagsInfo.posttotags.map((info) => info.tagId);
    const tags = [];
    for await (const tagId of tagIds) {
      const tagType = await tag.findUnique({
        where: {
          id: tagId,
        },
        select: {
          type: true,
        },
      });

      tags.push(tagType);
    }

    res.json({ tags });
  } catch (error) {
    console.log(error);
    res.json(errorHandler(error));
  }
}

module.exports = {
  getTagsTypes,
  getAlltags,
  createOnetag,
  deleteOnetag,
  getOnePostAllTags,
};

// model PostToTag {
//   id     Int  @id @default(autoincrement())
//   post   Post @relation(fields: [postId], references: [id], onDelete: Cascade)
//   postId Int
//   tag    Tag  @relation(fields: [tagId], references: [id], onDelete: Cascade)
//   tagId  Int

//   @@unique([postId, tagId])
// }

// model Tag {
//   id         Int         @id @default(autoincrement())
//   type       String
//   postToTags PostToTag[]
// }

// {
//   "id": 10,
//   "postId": 5,
//   "tagId": 11,
//   "post": {
//     "id": 5
//   },
//   "tag": {
//     "type": "bri"
//   }
// }
