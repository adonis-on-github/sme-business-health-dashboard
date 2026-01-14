-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL DEFAULT 'default-biz',
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "salesRange" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Metric" (
    "id" TEXT NOT NULL,
    "revenue" DOUBLE PRECISION NOT NULL,
    "expenses" DOUBLE PRECISION NOT NULL,
    "cashInBank" DOUBLE PRECISION NOT NULL,
    "topCustomerPct" DOUBLE PRECISION NOT NULL,
    "score" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "aiExplanation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "businessId" TEXT NOT NULL,

    CONSTRAINT "Metric_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metric" ADD CONSTRAINT "Metric_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
