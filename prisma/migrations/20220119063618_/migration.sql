/*
  Warnings:

  - You are about to drop the column `deleteCheck` on the `comment` table. All the data in the column will be lost.
  - Added the required column `adderssId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "deleteCheck",
ADD COLUMN     "check" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "adderssId" INTEGER NOT NULL,
ADD COLUMN     "certification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stay" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD FOREIGN KEY ("adderssId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
