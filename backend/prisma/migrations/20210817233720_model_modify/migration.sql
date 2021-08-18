/*
  Warnings:

  - You are about to drop the column `postToTagId` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `_ArchiveToPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArchiveToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ArchiveToPost" DROP CONSTRAINT "_ArchiveToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToPost" DROP CONSTRAINT "_ArchiveToPost_B_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToUser" DROP CONSTRAINT "_ArchiveToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArchiveToUser" DROP CONSTRAINT "_ArchiveToUser_B_fkey";

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "postToTagId";

-- DropTable
DROP TABLE "_ArchiveToPost";

-- DropTable
DROP TABLE "_ArchiveToUser";
