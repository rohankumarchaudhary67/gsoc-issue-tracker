/*
  Warnings:

  - The values [beginner,intermediate,advanced] on the enum `Difficulty` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `aiRequestsRemaining` on the `UsageQuota` table. All the data in the column will be lost.
  - You are about to drop the column `issueViewsRemaining` on the `UsageQuota` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Difficulty_new" AS ENUM ('Easy', 'Medium', 'Hard');
ALTER TABLE "Repo" ALTER COLUMN "difficulty" TYPE "Difficulty_new" USING ("difficulty"::text::"Difficulty_new");
ALTER TYPE "Difficulty" RENAME TO "Difficulty_old";
ALTER TYPE "Difficulty_new" RENAME TO "Difficulty";
DROP TYPE "Difficulty_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "History" DROP CONSTRAINT "History_userId_fkey";

-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- DropForeignKey
ALTER TABLE "UsageQuota" DROP CONSTRAINT "UsageQuota_userId_fkey";

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "action" TEXT,
ADD COLUMN     "metadata" JSONB,
ALTER COLUMN "issueId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UsageQuota" DROP COLUMN "aiRequestsRemaining",
DROP COLUMN "issueViewsRemaining",
ADD COLUMN     "aiQueries" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "aiQueriesLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "bookmarks" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "bookmarksLimit" INTEGER NOT NULL DEFAULT 10,
ADD COLUMN     "lastResetAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "openedIssues" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "openedIssuesLimit" INTEGER NOT NULL DEFAULT 5,
ADD COLUMN     "organizationAccess" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "organizationLimit" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "subscriptions",
ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'FREE';

-- AlterTable
ALTER TABLE "issues" ADD COLUMN     "repoId" TEXT,
ALTER COLUMN "labels" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "assignees" SET DEFAULT ARRAY[]::TEXT[];

-- DropTable
DROP TABLE "Preferences";

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "issueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "openIssues" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Repo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT,
    "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "difficulty" "Difficulty" NOT NULL DEFAULT 'Easy',

    CONSTRAINT "Repo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Bookmark_userId_idx" ON "Bookmark"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_issueId_key" ON "Bookmark"("userId", "issueId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- CreateIndex
CREATE INDEX "Organization_name_idx" ON "Organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Repo_name_key" ON "Repo"("name");

-- CreateIndex
CREATE INDEX "Repo_name_idx" ON "Repo"("name");

-- CreateIndex
CREATE INDEX "Repo_organizationId_idx" ON "Repo"("organizationId");

-- CreateIndex
CREATE INDEX "History_userId_idx" ON "History"("userId");

-- CreateIndex
CREATE INDEX "History_createdAt_idx" ON "History"("createdAt");

-- CreateIndex
CREATE INDEX "issues_repoId_idx" ON "issues"("repoId");

-- AddForeignKey
ALTER TABLE "UsageQuota" ADD CONSTRAINT "UsageQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_issueId_fkey" FOREIGN KEY ("issueId") REFERENCES "issues"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Repo" ADD CONSTRAINT "Repo_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issues" ADD CONSTRAINT "issues_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "Repo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
