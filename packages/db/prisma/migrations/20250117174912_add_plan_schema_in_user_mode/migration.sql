/*
  Warnings:

  - Added the required column `aiQuestionLimit` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentAiQuestion` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentOpenIssue` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currentPlan` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `openIssueLimit` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "aiQuestionLimit" INTEGER NOT NULL,
ADD COLUMN     "currentAiQuestion" INTEGER NOT NULL,
ADD COLUMN     "currentOpenIssue" INTEGER NOT NULL,
ADD COLUMN     "currentPlan" TEXT NOT NULL,
ADD COLUMN     "openIssueLimit" INTEGER NOT NULL,
ADD COLUMN     "sessionToken" TEXT;
