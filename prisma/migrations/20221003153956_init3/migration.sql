/*
  Warnings:

  - You are about to drop the `Counterpatry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Counterpatry";

-- CreateTable
CREATE TABLE "Counterparty" (
    "id" SERIAL NOT NULL,
    "cp_account" TEXT,
    "entity_type" TEXT,
    "action" BOOLEAN DEFAULT true,

    CONSTRAINT "Counterparty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counterparty_id_key" ON "Counterparty"("id");
