/*
  Warnings:

  - A unique constraint covering the columns `[postId,tagId]` on the table `PostToTag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PostToTag.postId_tagId_unique" ON "PostToTag"("postId", "tagId");
