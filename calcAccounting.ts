import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
let i = 0;

async function main() {
  //find all the coding needed for every transaction type from the ledger table to apply it to the Accounting JE table

  const findAllJeCoding = await prisma.ledger.findMany({
    where: {},
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Realized: true,
    },
  });

  for (const element of findAllJeCoding) {
    //if the transaction type returns a true i.e. realized needs to be calculate then run the following script
    if (element.Realized) {
      //find all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly

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
          Price_Symbol: true,
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
        //pull the coding from the ledger table which should be equal to where the loop is in the array minus 1

        i = element?.id - 1;
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
        console.log(i);
        const createAllCredit = await prisma.accountingJE.create({
          data: {
            Entity: element1?.Ownership,
            Wallet: element1?.Account,
            Asset: element1?.Price_Symbol,
            Proceed_Date: element1?.Proceed_Date,
            Ledger_Type1: findAllJeCoding[i].Cledger,
            Ledger_Type2: findAllJeCoding[i].CLedger_SType,
            Ledger_Name: element1.Transaction_Type,
            Credit: element1?.Cost_of_Basis,
            hive: {
              connect: {
                id: element1?.id,
              },
            },
          },
        });

        if (element1.Net === null) {
          console.log("null");
        } else if (element1.Net < 0) {
          element1.Net = Math.abs(element1.Net);

          const createAllDRealized = await prisma.accountingJE.create({
            data: {
              Entity: element1?.Ownership,
              Wallet: element1?.Account,
              Asset: element1?.Asset,
              Proceed_Date: element1?.Proceed_Date,
              Ledger_Type1: "Revenue",
              Ledger_Type2: "Realized (Gains)/Loss",
              Ledger_Name: element1.Transaction_Type,
              Debit: element1.Net,
              hive: {
                connect: {
                  id: element1?.id,
                },
              },
            },
          });
        }
      }
    }
  }
}

////----end of main function---------------------------------------

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
