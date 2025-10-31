-- AlterTable
ALTER TABLE "User" ADD COLUMN     "followersList" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "followingList" TEXT[] DEFAULT ARRAY[]::TEXT[];
