/*
  Warnings:

  - The `Ledger_Type1` column on the `AccountingJE` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "AccountingJE" DROP COLUMN "Ledger_Type1",
ADD COLUMN     "Ledger_Type1" TEXT;
