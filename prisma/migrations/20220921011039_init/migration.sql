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
    "dbid" SERIAL NOT NULL,
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

    CONSTRAINT "Hive_pkey" PRIMARY KEY ("dbid")
);

-- CreateTable
CREATE TABLE "AccountingJE" (
    "jeId" SERIAL NOT NULL,
    "Asset" TEXT,

    CONSTRAINT "AccountingJE_pkey" PRIMARY KEY ("jeId")
);

-- CreateTable
CREATE TABLE "Timisgod" (
    "id" SERIAL NOT NULL,
    "Asset" TEXT,

    CONSTRAINT "Timisgod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "AccountingJE" ADD CONSTRAINT "AccountingJE_jeId_fkey" FOREIGN KEY ("jeId") REFERENCES "Hive"("dbid") ON DELETE CASCADE ON UPDATE CASCADE;
