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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
