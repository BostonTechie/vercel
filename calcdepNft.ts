import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* The purpose of this script is to record 100% depreciation expense at the point in time that a new NFT asset is recieved in the blockchain, which assumes a NFT qualifies as a software asset within the USA tax code this code is designed to run after the main script runs recording the other Je's needed*/

async function main() {
  const findDeprecitionTransTypes = await prisma.accountingJE.findMany({
    distinct: ["id"],
    where: {
      Ledger_Type1: {
        in: ["Asset"],
      },
      Ledger_Name: {
        in: ["NFT_BUY", "NFT_ISSUED", "NFT_RECEIVED"],
      },
      Debit: {
        gt: 0,
      },
    },
    // if you want to do a test run uncomment the below line
    // take: 3,
  });

  for (const createJELineElement of findDeprecitionTransTypes) {
    const createAllDebit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Entity,
        Wallet: createJELineElement?.Wallet,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Expense",
        Ledger_Type2: "Nft-Software-depreciation",
        Ledger_Name: createJELineElement?.Ledger_Name,
        Debit: createJELineElement?.Debit,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });

    const createAllCredit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Entity,
        Wallet: createJELineElement?.Wallet,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Accumlated Deprecition - NFT",
        Ledger_Name: createJELineElement?.Ledger_Name,
        Credit: createJELineElement?.Debit,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
    console.log("disconect");
  });
