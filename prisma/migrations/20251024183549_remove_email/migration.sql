/*
  Warnings:

  - You are about to drop the column `email` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Post_email_idx";

-- DropIndex
DROP INDEX "public"."Post_email_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "email";

-- CreateIndex
CREATE INDEX "Post_username_idx" ON "Post"("username");
