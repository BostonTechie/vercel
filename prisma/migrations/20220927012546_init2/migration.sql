/*
  Warnings:

  - You are about to drop the `accountingJE` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accountingJE" DROP CONSTRAINT "accountingJE_CryptoDBid_fkey";

-- DropTable
DROP TABLE "accountingJE";

-- CreateTable
CREATE TABLE "AccountingJE" (
    "id" SERIAL NOT NULL,
    "Entity" TEXT,
    "Wallet" TEXT,
    "Asset" TEXT,
    "Proceed_Date" TIMESTAMP(3),
    "Ledger_Type1" TEXT,
    "Ledger_Type2" TEXT,
    "Ledger_Name" TEXT,
    "Debit" REAL DEFAULT 0,
    "Credit" REAL DEFAULT 0,
    "CryptoDBid" INTEGER NOT NULL,

    CONSTRAINT "AccountingJE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccountingJE_id_key" ON "AccountingJE"("id");

-- AddForeignKey
ALTER TABLE "AccountingJE" ADD CONSTRAINT "AccountingJE_CryptoDBid_fkey" FOREIGN KEY ("CryptoDBid") REFERENCES "Hive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
