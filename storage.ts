import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  ////----airdrop _ stake--------------------

  const resAllAirdrop_Stake = await prisma.hive.findMany({
    where: { Transaction_Type: "AIRDROP_STAKE" },
    select: {
      id: true,
    },
    take: 2,
  });

  for (const element of resAllAirdrop_Stake) {
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

    const createAllresDebit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Illquid",
        Ledger_Name: `AirDrop_stake`,
        Debit: resLoopFindUnique?.Gross_Proceed,

        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });

    const createAllresCredit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Liability",
        Ledger_Type2: "Deferred Revenue",
        Ledger_Name: `AirDrop_stake`,
        Credit: resLoopFindUnique?.Gross_Proceed,
        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });
    ////end of the buy loop
  }

  ////----airdrop _ stake--------------------

  ////----Producer_Reward--------------------

  const resAllProducer_Reward = await prisma.hive.findMany({
    where: { Transaction_Type: "PRODUCER_REWARD" },
    select: {
      id: true,
    },
    take: 2,
  });

  for (const element of resAllProducer_Reward) {
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

    const createAllresDebit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Illiquid",
        Ledger_Name: `Producer Reward`,
        Debit: resLoopFindUnique?.Gross_Proceed,

        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });

    const createAllresCredit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Liability",
        Ledger_Type2: "Deferred Revenue",
        Ledger_Name: `Producer Reward`,
        Credit: resLoopFindUnique?.Gross_Proceed,
        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });
  }

  ////----Recieved--------------------

  ////----Recieved--------------------

  const resAllRecieved = await prisma.hive.findMany({
    where: { Transaction_Type: "RECEIVED" },
    select: {
      id: true,
    },
    take: 2,
  });

  for (const element of resAllRecieved) {
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

    const createAllDebit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Liquid",
        Ledger_Name: `Recieved`,
        Debit: resLoopFindUnique?.Gross_Proceed,

        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });

    const createAllCredit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Revenue",
        Ledger_Type2: "Service Fee",
        Ledger_Name: `Recieved`,
        Credit: resLoopFindUnique?.Gross_Proceed,
        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });
  }

  ////----Recieved--------------------

  ////----Mining reward--------------------

  const resAllMiningReward = await prisma.hive.findMany({
    where: { Transaction_Type: "MINING_REWARD" },
    select: {
      id: true,
    },
    take: 2,
  });

  for (const element of resAllMiningReward) {
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

    const createAllDebit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "liquid",
        Ledger_Name: `Mining-Reward`,
        Debit: resLoopFindUnique?.Gross_Proceed,

        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });

    const createAllCredit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Liability",
        Ledger_Type2: "Deferred Revenue",
        Ledger_Name: `Mining Reward`,
        Credit: resLoopFindUnique?.Gross_Proceed,
        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });
  }

  ////-----Mining reward--------------------

  ////----Distribution--------------------

  const resAllDistribution = await prisma.hive.findMany({
    where: { Transaction_Type: "DISTRIBUTION" },
    select: {
      id: true,
    },
    take: 2,
  });

  for (const element of resAllDistribution) {
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

    const createAllDebit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "liquid",
        Ledger_Name: `Distribution`,
        Debit: resLoopFindUnique?.Gross_Proceed,

        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });

    const createAllCredit = await prisma.accountingJE.create({
      data: {
        Entity: resLoopFindUnique?.Ownership,
        Wallet: resLoopFindUnique?.Account,
        Asset: resLoopFindUnique?.Asset,
        Proceed_Date: resLoopFindUnique?.Proceed_Date,
        Ledger_Type1: "Liability",
        Ledger_Type2: "Deferred Revenue",
        Ledger_Name: `Distribution`,
        Credit: resLoopFindUnique?.Gross_Proceed,
        hive: {
          connect: {
            id: resLoopFindUnique?.id,
          },
        },
      },
    });
  }

  ////-----Mining reward--------------------

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
