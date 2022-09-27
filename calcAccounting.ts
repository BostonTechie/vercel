import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //find all the coding needed for every transaction type from the ledger table to apply it to the Accounting JE table

  const findAllJeCoding = await prisma.ledger.findMany({
    where: {},
    select: {
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Realized: true,
    },
  });
  for (const element of findAllJeCoding) {
    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
      },
      where: {
        Transaction_Type: element?.Transaction_Type,
      },
    });
    console.log(
      "length ",
      findTransactionsTypeForThisLoop.length,
      element.Transaction_Type,
      " ids ",
      findTransactionsTypeForThisLoop
    );

    for (const element1 of findTransactionsTypeForThisLoop) {
      console.log("hi");
    }
  }

  ////----end of main function---------------------------------------
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
