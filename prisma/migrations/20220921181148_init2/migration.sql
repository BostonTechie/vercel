/*
  Warnings:

  - You are about to drop the `accountJE` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accountJE" DROP CONSTRAINT "accountJE_Jeid_fkey";

-- DropTable
DROP TABLE "accountJE";

-- CreateTable
CREATE TABLE "accountingJE" (
    "id" SERIAL NOT NULL,
    "Asset" TEXT NOT NULL,
    "Jeid" INTEGER NOT NULL,

    CONSTRAINT "accountingJE_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accountingJE" ADD CONSTRAINT "accountingJE_Jeid_fkey" FOREIGN KEY ("Jeid") REFERENCES "Hive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
