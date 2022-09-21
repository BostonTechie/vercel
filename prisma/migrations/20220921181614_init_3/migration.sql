/*
  Warnings:

  - You are about to drop the column `Jeid` on the `accountingJE` table. All the data in the column will be lost.
  - Added the required column `CryptoDBid` to the `accountingJE` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "accountingJE" DROP CONSTRAINT "accountingJE_Jeid_fkey";

-- AlterTable
ALTER TABLE "accountingJE" DROP COLUMN "Jeid",
ADD COLUMN     "CryptoDBid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "accountingJE" ADD CONSTRAINT "accountingJE_CryptoDBid_fkey" FOREIGN KEY ("CryptoDBid") REFERENCES "Hive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
