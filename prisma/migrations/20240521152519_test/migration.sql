-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'BLOCKED');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastLogin" TIMESTAMP(3),
    "firstLogin" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "htmlUrl" TEXT,
    "resultCount" INTEGER,
    "searchDuration" SMALLINT,
    "adsWordsCount" SMALLINT,
    "urlCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSearch" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "keywordId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE INDEX "User_uuid_idx" ON "User"("uuid");

-- CreateIndex
CREATE INDEX "Keyword_key_idx" ON "Keyword"("key");

-- CreateIndex
CREATE INDEX "UserSearch_userId_keywordId_idx" ON "UserSearch"("userId", "keywordId");

-- AddForeignKey
ALTER TABLE "UserSearch" ADD CONSTRAINT "UserSearch_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSearch" ADD CONSTRAINT "UserSearch_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
