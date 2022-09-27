import { DLedger, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let i = 0;

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
        Ownership: true,
        Asset_Type: true,
        Asset: true,
        Account: true,
        Counterparty: true,
        Proceed_Date: true,
        Token_Price: true,
        Gross_Proceed: true,
        Cost_of_Basis: true,
        Net: true,
        Transaction_Type: true,
      },
      where: {
        Transaction_Type: element?.Transaction_Type,
      },
    });

    for (const element1 of findTransactionsTypeForThisLoop) {
      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: element1?.Ownership,
          Wallet: element1?.Account,
          Asset: element1?.Asset,
          Proceed_Date: element1?.Proceed_Date,
          Ledger_Type1: findAllJeCoding[i].Dledger,
          Ledger_Type2: findAllJeCoding[i].DLedger_SType,
          Ledger_Name: element1.Transaction_Type,
          Debit: element1?.Gross_Proceed,
          hive: {
            connect: {
              id: element1?.id,
            },
          },
        },
      });

      const createAllCredit = await prisma.accountingJE.create({
        data: {
          Entity: element1?.Ownership,
          Wallet: element1?.Account,
          Asset: element1?.Asset,
          Proceed_Date: element1?.Proceed_Date,
          Ledger_Type1: findAllJeCoding[i].Cledger,
          Ledger_Type2: findAllJeCoding[i].CLedger_SType,
          Ledger_Name: element1.Transaction_Type,
          Credit: element1?.Gross_Proceed,
          hive: {
            connect: {
              id: element1?.id,
            },
          },
        },
      });
    }

    i++;
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
