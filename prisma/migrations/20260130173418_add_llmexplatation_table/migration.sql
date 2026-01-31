/*
  Warnings:

  - You are about to drop the column `aiExplanation` on the `Metric` table. All the data in the column will be lost.
  - You are about to drop the column `aiStatus` on the `Metric` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "LLMStatus" AS ENUM ('GENERATED', 'ERROR');

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "aiExplanation",
DROP COLUMN "aiStatus";

-- DropEnum
DROP TYPE "AiStatus";

-- CreateTable
CREATE TABLE "LLMExplanation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "explanationMarkdown" TEXT,
    "llmStatus" "LLMStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "metricId" UUID NOT NULL,

    CONSTRAINT "LLMExplanation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LLMExplanation" ADD CONSTRAINT "LLMExplanation_metricId_fkey" FOREIGN KEY ("metricId") REFERENCES "Metric"("id") ON DELETE CASCADE ON UPDATE CASCADE;
