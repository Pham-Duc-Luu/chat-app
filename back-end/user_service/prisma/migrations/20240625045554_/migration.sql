/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetCodeCreatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "reactToType" AS ENUM ('Post', 'Comment');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('BLOG', 'AUDIO', 'SHORTVIDEO');

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "resetCode",
DROP COLUMN "resetCodeCreatedAt",
DROP COLUMN "username",
ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Follow" (
    "follower" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("follower","following")
);

-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "mediaType" TEXT NOT NULL,
    "mediaFile" BYTEA NOT NULL,
    "createBy" INTEGER NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminOfMicroSocial" (
    "admin" INTEGER NOT NULL,
    "microSocial" INTEGER NOT NULL,

    CONSTRAINT "AdminOfMicroSocial_pkey" PRIMARY KEY ("admin","microSocial")
);

-- CreateTable
CREATE TABLE "ContributorOfMicroSocial" (
    "contributor" INTEGER NOT NULL,
    "microSocial" INTEGER NOT NULL,

    CONSTRAINT "ContributorOfMicroSocial_pkey" PRIMARY KEY ("contributor","microSocial")
);

-- CreateTable
CREATE TABLE "MicroSocial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumnail" TEXT NOT NULL,
    "createBy" INTEGER NOT NULL,

    CONSTRAINT "MicroSocial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "belongTo" INTEGER NOT NULL,

    CONSTRAINT "SavedList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedPost" (
    "post" INTEGER NOT NULL,
    "list" INTEGER NOT NULL,

    CONSTRAINT "SavedPost_pkey" PRIMARY KEY ("post","list")
);

-- CreateTable
CREATE TABLE "Reaction" (
    "id" SERIAL NOT NULL,
    "reactType" TEXT NOT NULL,
    "reactFrom" INTEGER NOT NULL,
    "reactToType" "reactToType" NOT NULL,
    "reactToPost" INTEGER,
    "reactToComment" INTEGER,

    CONSTRAINT "Reaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "thread" INTEGER NOT NULL,
    "commentParent" INTEGER,
    "content" TEXT NOT NULL,
    "author" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "summary" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "post" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortVideo" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "video" BYTEA NOT NULL,
    "post" INTEGER NOT NULL,

    CONSTRAINT "ShortVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Audio" (
    "id" SERIAL NOT NULL,
    "post" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "audio" BYTEA NOT NULL,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "content" INTEGER NOT NULL,
    "belongTo" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "postType" "PostType" NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blog_post_key" ON "Blog"("post");

-- CreateIndex
CREATE UNIQUE INDEX "ShortVideo_post_key" ON "ShortVideo"("post");

-- CreateIndex
CREATE UNIQUE INDEX "Audio_post_key" ON "Audio"("post");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_following_fkey" FOREIGN KEY ("following") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_follower_fkey" FOREIGN KEY ("follower") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminOfMicroSocial" ADD CONSTRAINT "AdminOfMicroSocial_admin_fkey" FOREIGN KEY ("admin") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminOfMicroSocial" ADD CONSTRAINT "AdminOfMicroSocial_microSocial_fkey" FOREIGN KEY ("microSocial") REFERENCES "MicroSocial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorOfMicroSocial" ADD CONSTRAINT "ContributorOfMicroSocial_contributor_fkey" FOREIGN KEY ("contributor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContributorOfMicroSocial" ADD CONSTRAINT "ContributorOfMicroSocial_microSocial_fkey" FOREIGN KEY ("microSocial") REFERENCES "MicroSocial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MicroSocial" ADD CONSTRAINT "MicroSocial_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedList" ADD CONSTRAINT "SavedList_belongTo_fkey" FOREIGN KEY ("belongTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_post_fkey" FOREIGN KEY ("post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedPost" ADD CONSTRAINT "SavedPost_list_fkey" FOREIGN KEY ("list") REFERENCES "SavedList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactFrom_fkey" FOREIGN KEY ("reactFrom") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactToPost_fkey" FOREIGN KEY ("reactToPost") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_reactToComment_fkey" FOREIGN KEY ("reactToComment") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_thread_fkey" FOREIGN KEY ("thread") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_commentParent_fkey" FOREIGN KEY ("commentParent") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_post_fkey" FOREIGN KEY ("post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortVideo" ADD CONSTRAINT "ShortVideo_post_fkey" FOREIGN KEY ("post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_post_fkey" FOREIGN KEY ("post") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_belongTo_fkey" FOREIGN KEY ("belongTo") REFERENCES "MicroSocial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
