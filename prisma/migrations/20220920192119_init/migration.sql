-- CreateTable
CREATE TABLE "AccountingJE" (
    "jeId" SERIAL NOT NULL,
    "Asset" TEXT,

    CONSTRAINT "AccountingJE_pkey" PRIMARY KEY ("jeId")
);

-- CreateTable
CREATE TABLE "Create" (
    "jeId" SERIAL NOT NULL,
    "Asset" TEXT,

    CONSTRAINT "Create_pkey" PRIMARY KEY ("jeId")
);

-- AddForeignKey
ALTER TABLE "AccountingJE" ADD CONSTRAINT "AccountingJE_jeId_fkey" FOREIGN KEY ("jeId") REFERENCES "Hive"("dbid") ON DELETE CASCADE ON UPDATE CASCADE;
