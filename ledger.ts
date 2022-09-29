import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ledger() {
  ////----this script creates a table of unique transaction type that can be used generate a ledger table from all the  distinct Transaction types that exist within a given table

  const resTransTypes = await prisma.hive.findMany({
    distinct: ["Transaction_Type"],
    select: {
      Transaction_Type: true,
    },
  });

  for (const element of resTransTypes) {
    let response = element.Transaction_Type;

    const ledgerCoding = await prisma.ledger.create({
      data: {
        Transaction_Type: element.Transaction_Type,
      },
    });
  }
}

ledger()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
