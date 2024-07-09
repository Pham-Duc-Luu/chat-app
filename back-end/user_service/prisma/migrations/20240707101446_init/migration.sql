-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('github', 'google', 'facebook');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider";
