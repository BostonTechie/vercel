/*
  Warnings:

  - You are about to drop the `Create` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Create";

-- CreateTable
CREATE TABLE "CreateThis" (
    "jeId" SERIAL NOT NULL,
    "Asset" TEXT,

    CONSTRAINT "CreateThis_pkey" PRIMARY KEY ("jeId")
);
