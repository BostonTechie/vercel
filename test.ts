import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function ledger() {
  ////----airdrop _ stake--------------------

  const resTransTypes = await prisma.hive.findMany({
    distinct: ["Transaction_Type"],
    select: {
      Transaction_Type: true,
    },
  });

  let i = 0;
  for (const element of resTransTypes) {
    let response = element.Transaction_Type;

    const ledgerCoding = prisma.ledger.create({
      data: {
        id: 1,
        Transaction_Type: "response",
        Ledger_Type1: "hi",
        Ledger_Type2: "hi",
        Ledger_Name: "hi",
        Realized: true,
      },
    });

    i++;
    console.log(response, i);
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
