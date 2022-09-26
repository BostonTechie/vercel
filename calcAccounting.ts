import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // this section works...........
  // const review = await prisma.accountingJE.create({
  //   data: {
  //     Asset: "Dec",
  //     hive: {
  //       connect: {
  //         id: 1,
  //       },
  //     },
  //   },
  // });

  // this section works...........

  const resAllBuys = await prisma.hive.findMany({
    where: { Transaction_Type: "AIRDROP_STAKE" },
    select: {
      id: true,
    },
    take: 2,
  });
  for (const element of resAllBuys) {
    const res2 = await prisma.hive.findUnique({
      where: {
        id: element.id,
      },
      select: {
        id: true,
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
        Ownership: true,
      },
    });

    const createAllBuysDebit = await prisma.accountingJE.create({
      data: {
        Wallet: res2?.From,
        Asset: res2?.Asset,
        Proceed_Date: res2?.Proceed_Date,
        Ledger: `Producer-Reward-Asset`,
        Debit: res2?.Gross_Proceed,

        hive: {
          connect: {
            id: res2?.id,
          },
        },
      },
    });

    const createAllBuysCredit = await prisma.accountingJE.create({
      data: {
        Wallet: res2?.From,
        Asset: res2?.Asset,
        Proceed_Date: res2?.Proceed_Date,
        Ledger: `Deferred-Producer-Reward-Liability`,
        Credit: res2?.Gross_Proceed,

        hive: {
          connect: {
            id: res2?.id,
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
