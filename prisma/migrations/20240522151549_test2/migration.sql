/*
  Warnings:

  - Added the required column `userSearchId` to the `Keyword` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "KeywordStatus" AS ENUM ('PENDING', 'COMPLETED', 'RUNNING', 'FAILED');

-- DropForeignKey
ALTER TABLE "UserSearch" DROP CONSTRAINT "UserSearch_keywordId_fkey";

-- DropIndex
DROP INDEX "Keyword_key_idx";

-- AlterTable
ALTER TABLE "Keyword" ADD COLUMN     "status" "KeywordStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "userSearchId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Keyword_key_userSearchId_status_idx" ON "Keyword"("key", "userSearchId", "status");

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_userSearchId_fkey" FOREIGN KEY ("userSearchId") REFERENCES "UserSearch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
