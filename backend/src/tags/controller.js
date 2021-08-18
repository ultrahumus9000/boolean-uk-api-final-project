const { post, tag, postToTag } = require("../../database");
const { errorHandler } = require("../helper");

// async function getPostsByTag(req, res) {
//   try {
//     const result = await post.findMany({
//       where: {
//         tags: {
//           some: {
//             tag: {
//               type: req.body,
//             },
//           },
//         },
//       },
//     });
//     result.json(result);
//   } catch (error) {
//     console.log(error);
//     res.json(errorHandler(error));
//   }
// }

async function getAlltags(req, res) {
  try {
    const result = await tag.findMany();
    const secondResult = await postToTag.findMany();
    const fullResult = {
      tags: result,
      postToTags: secondResult,
    };
    res.json(fullResult);
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
      });

      const tagResult = await tag.findUnique({
        where: {
          id: newTag.tagId,
        },
      });

      res.json(tagResult.type);
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
      });

      // res.json(newTagToPost);
      res.json(tagInfo.type);
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

module.exports = {
  getAlltags,
  createOnetag,
  deleteOnetag,
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
