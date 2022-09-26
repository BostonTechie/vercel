import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const resAllNoAccounting = await prisma.hive.findMany({
    where: { Transaction_Type: "AIRDROP_STAKE" },
    select: {
      id: true,
    },
    take: 2,
  });
  for (const element of resAllNoAccounting) {
    const resLoopFindUnique = await prisma.hive.findUnique({
      where: {
        id: element.id,
      },
      select: {
        id: true,
        Ownership: true,
        Asset_Type: true,
        Asset: true,
        Account: true,
        Counterparty: true,
        Quantity: true,
        Basis_Date: true,
        Proceed_Date: true,
        Token_Price: true,
        Gross_Proceed: true,
        Cost_of_Basis: true,
        Net: true,
        Transaction_Type: true,
      },
    });

    const createAllresNoAccountingDebit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "N/A",
        Ledger_Type2: "N/A",
        Ledger_Name: `no pl impact`,
        Debit: resLoopFindUnique?.Gross_Proceed,

        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });

    const createAllresNoAccountingCredit = await prisma.accountingJE.create({
      data: {
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "N/A",
        Ledger_Type2: "N/A",
        Ledger_Name: `no pl impact`,
        Debit: resLoopFindUnique?.Gross_Proceed,
        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });
    ////end of the buy loop
  }

  ////----end of main function--------------------
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
