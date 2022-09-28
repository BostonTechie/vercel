import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //find all the coding needed for every transaction type from the ledger table to apply it to the Accounting JE table

  //might need a buy and a sell "type" on ledger table to better handle the in's vs outs for asset types

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

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const element of findAllJeCoding) {
    /* "i" (below) will pull the coding from the ledger table which should be equal to where the loop is in the array minus 1 (arrays start at zero)*/

    let ledgeri = element?.id - 1;

    //if the transaction type returns a true for the realized field that indicates realized needs to be calculated so the script will run the following script

    if (element.Realized) {
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

      for (const createJEline of findTransactionsTypeForThisLoop) {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        if 

        const createAllDebit = await prisma.accountingJE.create({
          data: {
            Entity: createJEline?.Ownership,
            Wallet: createJEline?.Account,
            Asset: createJEline?.Asset,
            Proceed_Date: createJEline?.Proceed_Date,
            Ledger_Type1: findAllJeCoding[ledgeri].Dledger,
            Ledger_Type2: findAllJeCoding[ledgeri].DLedger_SType,
            Ledger_Name: createJEline.Transaction_Type,
            Debit: createJEline?.Gross_Proceed,
            hive: {
              connect: {
                id: createJEline?.id,
              },
            },
          },
        });

        const createAllCredit = await prisma.accountingJE.create({
          data: {
            Entity: createJEline?.Ownership,
            Wallet: createJEline?.Account,
            Asset: createJEline?.Price_Symbol,
            Proceed_Date: createJEline?.Proceed_Date,
            Ledger_Type1: findAllJeCoding[ledgeri].Cledger,
            Ledger_Type2: findAllJeCoding[ledgeri].CLedger_SType,
            Ledger_Name: createJEline.Transaction_Type,
            Credit: createJEline?.Cost_of_Basis,
            hive: {
              connect: {
                id: createJEline?.id,
              },
            },
          },
        });

        if (createJEline.Net === null || createJEline.Net === 0) {
          /* the if (above) estential does nothing in the case that net (realized gain/ loss) is equal to zero or null. In either case You wouldn't want a script to process a journal entry.  It may be useful to have a log of nulls though for debuging */
        } else if (createJEline.Net <= 0) {
          createJEline.Net = Math.abs(createJEline.Net);

          const createAllDRealized = await prisma.accountingJE.create({
            data: {
              Entity: createJEline?.Ownership,
              Wallet: createJEline?.Account,
              Asset: createJEline?.Asset,
              Proceed_Date: createJEline?.Proceed_Date,
              Ledger_Type1: "OCI",
              Ledger_Type2: "Realized (Gains)/Loss",
              Ledger_Name: createJEline.Transaction_Type,
              Debit: createJEline.Net,
              hive: {
                connect: {
                  id: createJEline?.id,
                },
              },
            },
          });
        } else {
          const createAllCRealized = await prisma.accountingJE.create({
            data: {
              Entity: createJEline?.Ownership,
              Wallet: createJEline?.Account,
              Asset: createJEline?.Asset,
              Proceed_Date: createJEline?.Proceed_Date,
              Ledger_Type1: "Revenue",
              Ledger_Type2: "Realized (Gains)/Loss",
              Ledger_Name: createJEline.Transaction_Type,
              Credit: createJEline.Net,
              hive: {
                connect: {
                  id: createJEline?.id,
                },
              },
            },
          });
        }
      }
    }

    // if you want to see your script running on a larger data set
    // console.log(element.Transaction_Type, " process completed");
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
