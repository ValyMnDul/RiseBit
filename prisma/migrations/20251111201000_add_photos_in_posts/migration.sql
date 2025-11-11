-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "photos" TEXT[] DEFAULT ARRAY[]::TEXT[];
