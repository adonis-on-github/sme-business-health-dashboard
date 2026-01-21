/*
  Warnings:

  - You are about to drop the column `status` on the `Metric` table. All the data in the column will be lost.
  - You are about to alter the column `revenue` on the `Metric` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(16,2)`.
  - You are about to alter the column `expenses` on the `Metric` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(16,2)`.
  - You are about to alter the column `cashInBank` on the `Metric` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(16,2)`.
  - You are about to alter the column `topCustomerPct` on the `Metric` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(3,2)`.

*/
-- CreateEnum
CREATE TYPE "AiStatus" AS ENUM ('NOT_GENERATED', 'GENERATING', 'GENERATED', 'ERROR');

-- DropForeignKey
ALTER TABLE "Metric" DROP CONSTRAINT "Metric_businessId_fkey";

-- AlterTable
ALTER TABLE "Metric" DROP COLUMN "status",
ADD COLUMN     "aiStatus" "AiStatus" NOT NULL DEFAULT 'NOT_GENERATED',
ALTER COLUMN "revenue" SET DATA TYPE DECIMAL(16,2),
ALTER COLUMN "expenses" SET DATA TYPE DECIMAL(16,2),
ALTER COLUMN "cashInBank" SET DATA TYPE DECIMAL(16,2),
ALTER COLUMN "topCustomerPct" SET DATA TYPE DECIMAL(3,2);

-- CreateIndex
CREATE INDEX "Metric_businessId_createdAt_idx" ON "Metric"("businessId", "createdAt" DESC);

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
