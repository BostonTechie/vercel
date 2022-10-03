-- CreateTable
CREATE TABLE "Counterpatry" (
    "id" SERIAL NOT NULL,
    "cp_account" TEXT,
    "entity_type" TEXT,
    "action" BOOLEAN DEFAULT true,

    CONSTRAINT "Counterpatry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Counterpatry_id_key" ON "Counterpatry"("id");
