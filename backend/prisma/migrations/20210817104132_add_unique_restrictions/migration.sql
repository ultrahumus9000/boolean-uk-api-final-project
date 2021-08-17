/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Archive` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Archive.userId_unique" ON "Archive"("userId");
