/*
  Warnings:

  - The `createdAt` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updatedAt` column on the `Issue` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `aiQuestionLimit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentAiQuestion` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentOpenIssue` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `currentPlan` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `openIssueLimit` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_UserBookmarks` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[url]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserBookmarks" DROP CONSTRAINT "_UserBookmarks_B_fkey";

-- AlterTable
ALTER TABLE "Issue" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "aiQuestionLimit",
DROP COLUMN "currentAiQuestion",
DROP COLUMN "currentOpenIssue",
DROP COLUMN "currentPlan",
DROP COLUMN "openIssueLimit",
DROP COLUMN "sessionToken",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "_UserBookmarks";

-- CreateTable
CREATE TABLE "UserBookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserBookmark_userId_idx" ON "UserBookmark"("userId");

-- CreateIndex
CREATE INDEX "UserBookmark_issueId_idx" ON "UserBookmark"("issueId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBookmark_userId_issueId_key" ON "UserBookmark"("userId", "issueId");

-- CreateIndex
CREATE UNIQUE INDEX "Issue_url_key" ON "Issue"("url");

-- AddForeignKey
ALTER TABLE "UserBookmark" ADD CONSTRAINT "UserBookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserBookmark" ADD CONSTRAINT "UserBookmark_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "Issue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
