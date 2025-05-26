/*
  Warnings:

  - You are about to drop the `Issues` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Issues" DROP CONSTRAINT "Issues_organizationId_fkey";

-- DropTable
DROP TABLE "Issues";

-- DropTable
DROP TABLE "Organization";

-- CreateTable
CREATE TABLE "issues" (
    "id" TEXT NOT NULL,
    "github_id" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "state" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "author_avatar" TEXT,
    "repository_owner" TEXT NOT NULL,
    "repository_name" TEXT NOT NULL,
    "repository_full_name" TEXT NOT NULL,
    "labels" TEXT[],
    "assignees" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "closed_at" TIMESTAMP(3),
    "html_url" TEXT NOT NULL,
    "comments_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "issues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "issues_github_id_key" ON "issues"("github_id");

-- CreateIndex
CREATE INDEX "issues_repository_full_name_idx" ON "issues"("repository_full_name");

-- CreateIndex
CREATE INDEX "issues_state_idx" ON "issues"("state");

-- CreateIndex
CREATE INDEX "issues_updated_at_idx" ON "issues"("updated_at");

-- CreateIndex
CREATE INDEX "issues_author_idx" ON "issues"("author");
