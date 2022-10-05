import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //find all the coding needed for every transaction type from the ledger table to apply it to the Accounting JE table where realized Gain/Loss does not need to be calculated

  //tokens received is a seperate script to handle the tribe vs not tribe logic

  const findAllJeCoding = await prisma.ledger.findMany({
    where: {
      Realized: false,
      NOT: { Transaction_Type: { in: ["TOKENS_RECEIVED", "PRODUCER_REWARD"] } },
    },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Realized: true,
      Sale: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* (below) will pull the coding from the ledger table which should be equal to where the loop is in the array */

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;

    //if the transaction type returns a true for the realized field that indicates realized needs to be calculated so the script will run the following script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
        Account_Ownership: true,
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
        Duration: true,
      },
      where: {
        Transaction_Type: elementJeCoding?.Transaction_Type,
      },

      // if you want to do a test run uncomment the below line
      take: 3,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      if (elementJeCoding.Sale === "Sale") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        let storeString = createJELineElement?.Price_Symbol;
        let storeString2 = createJELineElement?.Asset;

        createJELineElement.Asset = storeString;
        createJELineElement.Price_Symbol = storeString2;
      }
      if (elementJeCoding.Sale === "Buy") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        let storeString = createJELineElement?.Price_Symbol;
        let storeString2 = createJELineElement?.Asset;

        createJELineElement.Asset = storeString2;
        createJELineElement.Price_Symbol = storeString;
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: debitLedgerType,
          Ledger_Type2: debitLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: creditLedgerType,
          Ledger_Type2: creditLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Gross_Proceed,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });
    }

    // if you want to see your script running on a larger data set
    console.log(elementJeCoding.Transaction_Type, " process completed");
  }
}
//----end of main function---------------------------------------

async function producerReward() {
  //find all the coding needed for every transaction type from the ledger table to apply it to the Accounting JE table where realized Gain/Loss does not need to be calculated

  //tokens received is a seperate script to handle the tribe vs not tribe logic

  const findAllJeCoding = await prisma.ledger.findMany({
    where: { Realized: false, Transaction_Type: "PRODUCER_REWARD" },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Realized: true,
      Sale: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* (below) will pull the coding from the ledger table which should be equal to where the loop is in the array */

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;

    //if the transaction type returns a true for the realized field that indicates realized needs to be calculated so the script will run the following script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
        Account_Ownership: true,
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
        Duration: true,
      },
      where: {
        Transaction_Type: elementJeCoding?.Transaction_Type,
      },

      // if you want to do a test run uncomment the below line
      take: 3,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      if (elementJeCoding.Sale === "Sale") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        let storeString = createJELineElement?.Price_Symbol;
        let storeString2 = createJELineElement?.Asset;

        createJELineElement.Asset = storeString;
        createJELineElement.Price_Symbol = storeString2;
      }
      if (elementJeCoding.Sale === "Buy") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        let storeString = createJELineElement?.Price_Symbol;
        let storeString2 = createJELineElement?.Asset;

        createJELineElement.Asset = storeString2;
        createJELineElement.Price_Symbol = storeString;
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: debitLedgerType,
          Ledger_Type2: debitLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: creditLedgerType,
          Ledger_Type2: creditLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Gross_Proceed,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });
    }

    // if you want to see your script running on a larger data set
    console.log(elementJeCoding.Transaction_Type, " process completed");
  }
}

////----end of  producerReward function---------------------------------------

async function tribe_tokens() {
  //find all the coding needed for every transaction type from the ledger table to apply it to the Accounting JE table where realized Gain/Loss does not need to be calculated because Tribe Tokens are always Net new

  const findAllJeCoding = await prisma.ledger.findMany({
    where: { Transaction_Type: "TOKENS_RECEIVED" },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Realized: true,
      Sale: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* (below) will pull the coding from the ledger table which should be equal to where the loop is in the array */

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;

    //if the transaction type returns a true for the realized field that indicates realized needs to be calculated so the script will run the following script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
        Account_Ownership: true,
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
        Duration: true,
      },
      where: {
        Transaction_Type: elementJeCoding.Transaction_Type,
        Asset: {
          in: [
            "PAL",
            "WINE",
            "LVL",
            "NFTM",
            "MONEY",
            "PLN",
            "LASSECASH",
            "REDACTED",
            "INFOWARS",
            "SPT",
            "THGAMING",
            "FDOGE",
            "AFITX",
            "BEATCZ",
            "QUEEN",
            "LUV",
            "WEED",
            "MEME",
            "JAHM",
            "GAMER",
            "SYSTEM",
            "SAND",
            "HUSTLER",
            "HELIOS",
            "APE",
            "NEOXAG",
            "MADNESS",
            "PHOENIX",
            "FBTC",
            "ASHES",
            "BXT",
            "FAITH",
            "ONEUP",
            "WAIV",
            "LOTUS",
            "ACASH",
            "BJ",
            "BEER",
            "ALERT",
            "HIQS",
            "BUDS",
            "LEO",
            "STINGER",
            "BLOOM",
            "CROP",
            "COM",
            "LIST",
            "ARCHON",
            "UROCK",
            "DUCAT",
            "BROS",
            "LASSIE",
            "CENT",
            "SPI",
            "PHOTO",
            "BABYJESUS",
            "CREATOR",
            "JESUS",
            "PUPPY",
            "BBK",
            "FQX",
            "BOT",
            "BYT",
            "BBD",
            "HYPNO",
            "ASH",
            "BHT",
            "CCC",
            "PIZZA",
            "BTCMYK",
            "CINE",
            "BATTLE",
            "BUIDL",
            "ENGAGE",
            "PORN",
            "DUNK",
            "FART",
            "FOODIE",
            "LA",
            "NEOX",
            "NOBODY",
            "PIMP",
            "TAN",
            "WINEX",
          ],
        },
      },

      // if you want to do a test run uncomment the below line
      take: 1,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      if (elementJeCoding.Sale === "Sale") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        let storeString = createJELineElement?.Price_Symbol;
        let storeString2 = createJELineElement?.Asset;

        createJELineElement.Asset = storeString;
        createJELineElement.Price_Symbol = storeString2;
      }
      if (elementJeCoding.Sale === "Buy") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        let storeString = createJELineElement?.Price_Symbol;
        let storeString2 = createJELineElement?.Asset;

        createJELineElement.Asset = storeString2;
        createJELineElement.Price_Symbol = storeString;
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: debitLedgerType,
          Ledger_Type2: debitLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: creditLedgerType,
          Ledger_Type2: creditLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Gross_Proceed,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });
    }

    // if you want to see your script running on a larger data set
    console.log(elementJeCoding.Transaction_Type, " Tribe process completed");
  }
}

////----end of tribe_tokens function---------------------------------------

async function notIN_tribe_tokens() {
  //find all the coding needed for every transaction type where a realized gain / loss needs to be calculated from the ledger table to apply it to the Accounting JE table

  const findAllJeCoding = await prisma.ledger.findMany({
    where: { Transaction_Type: "TOKENS_RECEIVED" },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Sale: true,
      Realized_Type: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* the below will pull the coding from the ledger table which should be equal to where the loop is in the array*/

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;
    let realType = "Realized (Gain) /Loss";

    // toggled realized = true on the find many where clause the beloew calculates that script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
        Account_Ownership: true,
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
        Duration: true,
      },
      where: {
        Transaction_Type: elementJeCoding.Transaction_Type,
        Asset: {
          notIn: [
            "PAL",
            "WINE",
            "LVL",
            "NFTM",
            "MONEY",
            "PLN",
            "LASSECASH",
            "REDACTED",
            "INFOWARS",
            "SPT",
            "THGAMING",
            "FDOGE",
            "AFITX",
            "BEATCZ",
            "QUEEN",
            "LUV",
            "WEED",
            "MEME",
            "JAHM",
            "GAMER",
            "SYSTEM",
            "SAND",
            "HUSTLER",
            "HELIOS",
            "APE",
            "NEOXAG",
            "MADNESS",
            "PHOENIX",
            "FBTC",
            "ASHES",
            "BXT",
            "FAITH",
            "ONEUP",
            "WAIV",
            "LOTUS",
            "ACASH",
            "BJ",
            "BEER",
            "ALERT",
            "HIQS",
            "BUDS",
            "LEO",
            "STINGER",
            "BLOOM",
            "CROP",
            "COM",
            "LIST",
            "ARCHON",
            "UROCK",
            "DUCAT",
            "BROS",
            "LASSIE",
            "CENT",
            "SPI",
            "PHOTO",
            "BABYJESUS",
            "CREATOR",
            "JESUS",
            "PUPPY",
            "BBK",
            "FQX",
            "BOT",
            "BYT",
            "BBD",
            "HYPNO",
            "ASH",
            "BHT",
            "CCC",
            "PIZZA",
            "BTCMYK",
            "CINE",
            "BATTLE",
            "BUIDL",
            "ENGAGE",
            "PORN",
            "DUNK",
            "FART",
            "FOODIE",
            "LA",
            "NEOX",
            "NOBODY",
            "PIMP",
            "TAN",
            "WINEX",
          ],
        },
        Net: {
          not: 0,
        },
      },

      // if you want to do a test run uncomment the below line
      take: 5,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      let storeStringPriceSymbol = createJELineElement.Price_Symbol;
      let storeStringAsset = createJELineElement.Asset;
      let storeNet = createJELineElement.Net;
      let StoreRealizedSell = "";
      //set the coding for tokens recieved to differentiate tribe vs no tribe accounting needs.
      elementJeCoding.Sale = "Buy";

      if (elementJeCoding.Sale === "Buy") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        createJELineElement.Asset = storeStringAsset;
        createJELineElement.Price_Symbol = storeStringPriceSymbol;
        StoreRealizedSell = `${storeStringPriceSymbol}`;
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: debitLedgerType,
          Ledger_Type2: "Liquid",
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: "Revenue",
          Ledger_Type2: "Token_Recieved_CVC",
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Gross_Proceed,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });
    }

    // if you want to see your script running on a larger data set
    console.log(
      elementJeCoding.Transaction_Type,
      " Not Tribe process completed"
    );
  }
}

////----end of tribe_tokens function---------------------------------------

async function calcServiceFeeTransfer() {
  //find all the coding needed for every transaction type where a realized gain / loss needs to be calculated from the ledger table to apply it to the Accounting JE table

  const findAllJeCoding = await prisma.ledger.findMany({
    where: { Realized: true, Transaction_Type: "TRANSFER" },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Sale: true,
      Realized_Type: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* the below will pull the coding from the ledger table which should be equal to where the loop is in the array*/

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;
    let realType = elementJeCoding.Realized_Type;

    // toggled realized = true on the find many where clause the beloew calculates that script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
        Account_Ownership: true,
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
        Duration: true,
      },
      where: {
        Transaction_Type: elementJeCoding?.Transaction_Type,
        NOT: {
          Counterparty: "null",
        },
        Counterparty: {
          in: [
            "privex",
            "postpromoter",
            "buildawhale",
            "upme",
            "appreciator",
            "null",
            "randowhale",
            "anonsteem",
            "upmyvote",
            "sneaky-ninja",
            "smartsteem",
            "lovejuice",
            "boomerang",
            "booster",
            "promobot",
            "pushup",
            "jerrybanfield",
            "msp-bidbot",
            "therising",
            "minnowbooster",
            "upmewhale",
            "familyprotection",
            "rocky1",
            "freedom",
            "ginabot",
            "minnowhelper",
            "paywithsteem",
            "sm-voter",
            "buiildawhale",
            "msp-lovebot",
            "msp-reg",
            "openmic",
            "banjo",
          ],
        },
      },
      // if you want to do a test run uncomment the below line
      take: 1,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      let storeStringPriceSymbol = createJELineElement.Price_Symbol;
      let storeStringAsset = createJELineElement.Asset;
      let storeNet = createJELineElement.Net;
      let StoreRealizedSell = "";

      if (elementJeCoding.Sale === "Sale") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        createJELineElement.Asset = storeStringPriceSymbol;
        createJELineElement.Price_Symbol = storeStringAsset;
        StoreRealizedSell = `${storeStringAsset}`;
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: debitLedgerType,
          Ledger_Type2: "Business-Services",
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: creditLedgerType,
          Ledger_Type2: creditLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Cost_of_Basis,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });

      if (createJELineElement.Net === null || storeNet === 0) {
        /* the if (above) estential does nothing in the case that net (realized gain/ loss) is equal to zero or null. In either case You wouldn't want a script to process a journal entry.  It may be useful to have a log of nulls though for debuging */
      } else if (createJELineElement.Net < 0) {
        const createAllDRealized = await prisma.accountingJE.create({
          data: {
            Entity: createJELineElement?.Account_Ownership,
            Wallet: createJELineElement?.Account,
            Asset: StoreRealizedSell,
            Proceed_Date: createJELineElement?.Proceed_Date,
            Ledger_Type1: "Revenue",
            Ledger_Type2: realType,
            Ledger_Name: createJELineElement.Transaction_Type,
            Debit: createJELineElement.Net,
            Duration: createJELineElement?.Duration,
            hive: {
              connect: {
                id: createJELineElement?.id,
              },
            },
          },
        });
      } else {
        const createAllCRealized = await prisma.accountingJE.create({
          data: {
            Entity: createJELineElement?.Account_Ownership,
            Wallet: createJELineElement?.Account,
            Asset: StoreRealizedSell,
            Proceed_Date: createJELineElement?.Proceed_Date,
            Ledger_Type1: "Revenue",
            Ledger_Type2: realType,
            Ledger_Name: createJELineElement.Transaction_Type,
            Credit: createJELineElement.Net,
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

    // if you want to see your script running on a larger data set
    console.log("Transfer Service fee process completed");
  }
}
////----end of calcServiceFeeTransfer function---------------------------------------

async function calcContractorFeeTransfer() {
  //find all the coding needed for every transaction type where a realized gain / loss needs to be calculated from the ledger table to apply it to the Accounting JE table

  const findAllJeCoding = await prisma.ledger.findMany({
    where: { Realized: true, Transaction_Type: "TRANSFER" },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Sale: true,
      Realized_Type: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* the below will pull the coding from the ledger table which should be equal to where the loop is in the array*/

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;
    let realType = elementJeCoding.Realized_Type;

    // toggled realized = true on the find many where clause the beloew calculates that script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
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
        Duration: true,
        Account_Ownership: true,
      },
      where: {
        Transaction_Type: elementJeCoding?.Transaction_Type,
        NOT: {
          Counterparty: "null",
        },
        Counterparty: {
          in: [
            "isaria",
            "reazuliqbal",
            "bait002",
            "clayboyn",
            "cryptomancer",
            "eonwarped",
            "lion200",
            "chobro",
            "cupz",
            "r0nd0n",
            "zaxan",
            "swelker101",
            "crimsonclad",
            "victoriabsb",
            "theghost1980",
            "gmuxx",
            "juliakponsford",
            "meno",
            "someguy123",
            "donchate",
            "ausbitbank",
            "discordiant",
            "sircork",
            "kubbyelizabeth",
            "llfarms",
            "rhondak",
            "wanderingartist",
            "hz432creations",
            "ali-h",
            "inertia",
            "crystalhuman",
            "daniarnold",
            "gtg",
            "jesse2you",
            "jestermage",
            "neoxian",
            "suzi3d",
            "thejohalfiles",
            "yabapmatt",
            "bdexchange",
            "heraclio",
            "acidyo",
            "choogirl",
            "creativesoul",
            "danielsaori",
            "exyle",
            "fatpandadesign",
            "globocop",
            "kaylinart",
            "limabeing",
            "ma1neevent",
            "modprobe",
            "otage",
            "paulag",
            "rougebot",
            "slowwalker",
            "soundwavesphoton",
            "sunravelme",
            "swolesome",
            "theprophet0",
            "uniwhisp",
            "princessmewmew",
            "anyx",
            "asgarth",
            "beggars",
            "cryptoctopus",
            "amberyooper",
            "artsygoddess",
            "bearone",
            "birdinc",
            "byzantinist",
            "candycal",
            "carlgnash",
            "carrieallen",
            "clove71",
            "crystalpacheco30",
            "drakos",
            "lexiconical",
            "nealmcspadden",
            "pennsif",
            "picokernel",
            "rakkasan84",
            "reseller",
            "rivalzzz",
            "roelandp",
            "theuxyeti",
            "ty2nicerva",
            "wilhb81",
            "wipgirl",
            "silentscreamer",
            "simgirl",
          ],
        },
      },
      // if you want to do a test run uncomment the below line
      take: 3,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      let storeStringPriceSymbol = createJELineElement.Price_Symbol;
      let storeStringAsset = createJELineElement.Asset;
      let storeNet = createJELineElement.Net;
      let StoreRealizedSell = "";

      if (elementJeCoding.Sale === "Sale") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        createJELineElement.Asset = storeStringPriceSymbol;
        createJELineElement.Price_Symbol = storeStringAsset;
        StoreRealizedSell = `${storeStringAsset}`;
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: debitLedgerType,
          Ledger_Type2: "Business-Contractors",
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: creditLedgerType,
          Ledger_Type2: creditLedger,
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Cost_of_Basis,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });

      if (createJELineElement.Net === null || storeNet === 0) {
        /* the if (above) estential does nothing in the case that net (realized gain/ loss) is equal to zero or null. In either case You wouldn't want a script to process a journal entry.  It may be useful to have a log of nulls though for debuging */
      } else if (createJELineElement.Net < 0) {
        createJELineElement.Net = Math.abs(createJELineElement.Net);

        const createAllDRealized = await prisma.accountingJE.create({
          data: {
            Entity: createJELineElement?.Account_Ownership,
            Wallet: createJELineElement?.Account,
            Asset: StoreRealizedSell,
            Proceed_Date: createJELineElement?.Proceed_Date,
            Ledger_Type1: "Revenue",
            Ledger_Type2: realType,
            Ledger_Name: createJELineElement.Transaction_Type,
            Debit: createJELineElement.Net,
            Duration: createJELineElement?.Duration,
            hive: {
              connect: {
                id: createJELineElement?.id,
              },
            },
          },
        });
      } else {
        const createAllCRealized = await prisma.accountingJE.create({
          data: {
            Entity: createJELineElement?.Account_Ownership,
            Wallet: createJELineElement?.Account,
            Asset: StoreRealizedSell,
            Proceed_Date: createJELineElement?.Proceed_Date,
            Ledger_Type1: "Revenue",
            Ledger_Type2: realType,
            Ledger_Name: createJELineElement.Transaction_Type,
            Credit: createJELineElement.Net,
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

    // if you want to see your script running on a larger data set
    console.log("Transfer Contractor fee process completed");
  }
}

////----end of calcContractorFeeTransfer function---------------------------------------

async function Exchange_Transfers() {
  //find all the coding needed for every transaction type where a realized gain / loss needs to be calculated from the ledger table to apply it to the Accounting JE table

  const findAllJeCoding = await prisma.ledger.findMany({
    where: { Realized: true, Transaction_Type: "TRANSFER" },
    select: {
      id: true,
      Transaction_Type: true,
      Dledger: true,
      DLedger_SType: true,
      Cledger: true,
      CLedger_SType: true,
      Sale: true,
      Realized_Type: true,
    },
  });

  //the below for loop finds all the transactions that match the  transaction type (see the where clause)note all the tranaction types must exist in the legder table before this script will run correctly
  for (const elementJeCoding of findAllJeCoding) {
    /* the below will pull the coding from the ledger table which should be equal to where the loop is in the array*/

    let debitLedgerType = elementJeCoding.Dledger;
    let creditLedgerType = elementJeCoding.Cledger;
    let creditLedger = elementJeCoding.CLedger_SType;
    let debitLedger = elementJeCoding.DLedger_SType;
    let realType = elementJeCoding.Realized_Type;

    // toggled realized = true on the find many where clause the beloew calculates that script

    const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
      distinct: ["id"],
      select: {
        id: true,
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
        Duration: true,
        Account_Ownership: true,
      },
      where: {
        Transaction_Type: elementJeCoding?.Transaction_Type,
        NOT: {
          Counterparty: "null",
        },
        Counterparty: {
          in: [
            "honey-swap",
            "bittrex",
            "blocktrades",
            "graphene-swap",
            "swap-eth",
            "steem-peg",
            "steem-tokens",
          ],
        },
      },
      // if you want to do a test run uncomment the below line
      take: 3,
    });

    for (const createJELineElement of findTransactionsTypeForThisLoop) {
      let storeStringPriceSymbol = createJELineElement.Price_Symbol;
      let storeStringAsset = createJELineElement.Asset;
      let storeNet = createJELineElement.Net;
      let StoreRealizedSell = "";

      if (elementJeCoding.Sale === "Buy") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        createJELineElement.Asset = storeStringAsset;
        createJELineElement.Price_Symbol = storeStringPriceSymbol;
        StoreRealizedSell = `${storeStringPriceSymbol}`;
      }

      if (elementJeCoding.Sale === "Sale") {
        /*   With hive inherantly some transaction types signify different things, an important example of this is "Sell" versus "Buy" transactions.  In the case of "Buy"  the token in the "Asset" column is the asset in question being purchase, which would be a Debit in accounting.  In "Sell: Transactions the "Asset" column denotes the asset being sold which would be a Credit.  The logic below handles that fundamental difference*/

        createJELineElement.Asset = storeStringPriceSymbol;
        createJELineElement.Price_Symbol = storeStringAsset;
        StoreRealizedSell = `${storeStringAsset}`;

        // if (storeNet != 0) {
        //   createJELineElement.Gross_Proceed = storeNet;
        // }
      }

      const createAllDebit = await prisma.accountingJE.create({
        data: {
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Asset,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: "Asset",
          Ledger_Type2: "Liquid",
          Ledger_Name: createJELineElement.Transaction_Type,
          Debit: createJELineElement?.Gross_Proceed,
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
          Entity: createJELineElement?.Account_Ownership,
          Wallet: createJELineElement?.Account,
          Asset: createJELineElement.Price_Symbol,
          Proceed_Date: createJELineElement?.Proceed_Date,
          Ledger_Type1: "Asset",
          Ledger_Type2: "Liquid",
          Ledger_Name: createJELineElement.Transaction_Type,
          Credit: createJELineElement?.Cost_of_Basis,
          Duration: createJELineElement?.Duration,
          hive: {
            connect: {
              id: createJELineElement?.id,
            },
          },
        },
      });

      if (createJELineElement.Net === null || storeNet === 0) {
        /* the if (above) estential does nothing in the case that net (realized gain/ loss) is equal to zero or null. In either case You wouldn't want a script to process a journal entry.  It may be useful to have a log of nulls though for debuging */
      } else if (createJELineElement.Net < 0) {
        createJELineElement.Net = Math.abs(createJELineElement.Net);

        const createAllDRealized = await prisma.accountingJE.create({
          data: {
            Entity: createJELineElement?.Account_Ownership,
            Wallet: createJELineElement?.Account,
            Asset: StoreRealizedSell,
            Proceed_Date: createJELineElement?.Proceed_Date,
            Ledger_Type1: "Revenue",
            Ledger_Type2: "Realized (Gains) /Loss - on exchange",
            Ledger_Name: createJELineElement.Transaction_Type,
            Debit: createJELineElement.Net,
            Duration: createJELineElement?.Duration,
            hive: {
              connect: {
                id: createJELineElement?.id,
              },
            },
          },
        });
      } else {
        const createAllCRealized = await prisma.accountingJE.create({
          data: {
            Entity: createJELineElement?.Account_Ownership,
            Wallet: createJELineElement?.Account,
            Asset: StoreRealizedSell,
            Proceed_Date: createJELineElement?.Proceed_Date,
            Ledger_Type1: "Revenue",
            Ledger_Type2: "Realized (Gains) /Loss - on exchange",
            Ledger_Name: createJELineElement.Transaction_Type,
            Credit: createJELineElement.Net,
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

    // if you want to see your script running on a larger data set
    console.log("Transfer exchanges process completed");
  }
}

////----end of Exchange_Transfers function----------------------------------------------

async function NFT_Transfers() {
  //find all the coding needed for every transaction type where a the transaction type is tranfer but the counterparty is not recieving a Token like Hive, but a NFT card that has in fact been tokenized

  const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
    distinct: ["id"],
    select: {
      id: true,
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
      Duration: true,
      Account_Ownership: true,
    },
    where: {
      Transaction_Type: "TRANSFER",
      NOT: {
        Counterparty: "null",
      },
      Counterparty: {
        in: [
          "peakmonsters",
          "steemmonsters",
          "steem-mart",
          "positive-trail",
          "sm-fundition",
          "patelincho",
          "splinterlands",
        ],
      },
    },
    // if you want to do a test run uncomment the below line
    take: 3,
  });

  for (const createJELineElement of findTransactionsTypeForThisLoop) {
    // console.log(createJELineElement);
    const createAllDebit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Accumlated Deprecition - NFT",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Debit: createJELineElement?.Cost_of_Basis,
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
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Illiquid-NFT-Transfer",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Credit: createJELineElement?.Cost_of_Basis,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });

    // console.log(createJELineElement);
    const createOCIDebit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Liquid-NFT-Transfer",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Debit: createJELineElement?.Gross_Proceed,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });

    const createAllOCICredit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Revenue",
        Ledger_Type2: "Gain on NFT Transfer",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Credit: createJELineElement?.Gross_Proceed,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });
  }

  // if you want to see your script running on a larger data set
  console.log("NFT Transfers process completed");
}

////----end of NFT_Transfers function---------------------------------------

async function NFT_Received() {
  //find all the coding needed for every transaction type where a the transaction type is tranfer but the counterparty is not recieving a Token like Hive, but a NFT card that has in fact been tokenized

  const findTransactionsTypeForThisLoop = await prisma.hive.findMany({
    distinct: ["id"],
    select: {
      id: true,
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
      Duration: true,
      Account_Ownership: true,
    },
    where: {
      Transaction_Type: "RECEIVED",
      NOT: {
        Counterparty: "null",
      },
      Counterparty: {
        in: [
          "peakmonsters",
          "steemmonsters",
          "steem-mart",
          "positive-trail",
          "sm-fundition",
          "patelincho",
          "splinterlands",
        ],
      },
    },
    // if you want to do a test run uncomment the below line
    take: 3,
  });

  for (const createJELineElement of findTransactionsTypeForThisLoop) {
    // console.log(createJELineElement);
    const createAllDebit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Illiquid-NFT-Transfer",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Debit: createJELineElement?.Gross_Proceed,
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
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Liquid-NFT-Transfer",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Credit: createJELineElement?.Gross_Proceed,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });

    // console.log(createJELineElement);
    const createOCIDebit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Expense",
        Ledger_Type2: "Depreciation-NFT-Transfer",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Debit: createJELineElement?.Gross_Proceed,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });

    const createAllOCICredit = await prisma.accountingJE.create({
      data: {
        Entity: createJELineElement?.Account_Ownership,
        Wallet: createJELineElement?.Account,
        Asset: createJELineElement.Asset,
        Proceed_Date: createJELineElement?.Proceed_Date,
        Ledger_Type1: "Asset",
        Ledger_Type2: "Accumlated Deprecition - NFT",
        Ledger_Name: createJELineElement?.Transaction_Type,
        Credit: createJELineElement?.Gross_Proceed,
        Duration: createJELineElement?.Duration,
        hive: {
          connect: {
            id: createJELineElement?.id,
          },
        },
      },
    });
  }

  // if you want to see your script running on a larger data set
  console.log("NFT Recieved process completed");
}

////----end of NFT_Received function---------------------------------------

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

producerReward()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

notIN_tribe_tokens()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

tribe_tokens()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

calcServiceFeeTransfer()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

calcContractorFeeTransfer()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

Exchange_Transfers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

NFT_Transfers()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });

NFT_Received()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
