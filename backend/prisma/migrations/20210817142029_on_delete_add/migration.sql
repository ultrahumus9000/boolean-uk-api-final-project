-- DropForeignKey
ALTER TABLE "Archive" DROP CONSTRAINT "Archive_userId_fkey";

-- AddForeignKey
ALTER TABLE "Archive" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
