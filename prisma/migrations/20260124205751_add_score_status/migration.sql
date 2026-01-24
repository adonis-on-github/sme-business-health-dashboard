-- CreateEnum
CREATE TYPE "ScoreStatus" AS ENUM ('GREEN', 'YELLOW', 'RED');

-- AlterTable
ALTER TABLE "Metric" ADD COLUMN     "scoreStatus" "ScoreStatus" NOT NULL DEFAULT 'GREEN';
