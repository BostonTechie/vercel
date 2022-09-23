-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hive" (
    "id" SERIAL NOT NULL,
    "Asset Type" TEXT,
    "Asset" TEXT,
    "From" TEXT,
    "To" TEXT,
    "Quantity" REAL,
    "Basis Date" DATE,
    "Proceed Date" DATE,
    "Token Price" REAL,
    "Gross Proceed" REAL,
    "Cost of Basis" REAL,
    "Net" REAL,
    "Transaction Type" TEXT,
    "Duration" TEXT,
    "Block" INTEGER,
    "Transaction ID" TEXT,
    "Note" TEXT,

    CONSTRAINT "Hive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accountingJE" (
    "id" SERIAL NOT NULL,
    "Wallet" TEXT,
    "Asset" TEXT,
    "Proceed_Date" TIMESTAMP(3),
    "Ledger" TEXT,
    "Debit" REAL,
    "Credit" REAL,
    "CryptoDBid" INTEGER NOT NULL,

    CONSTRAINT "accountingJE_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hive_id_key" ON "Hive"("id");

-- CreateIndex
CREATE UNIQUE INDEX "accountingJE_id_key" ON "accountingJE"("id");

-- AddForeignKey
ALTER TABLE "accountingJE" ADD CONSTRAINT "accountingJE_CryptoDBid_fkey" FOREIGN KEY ("CryptoDBid") REFERENCES "Hive"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
