import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("i am on");

  const review = await prisma.accountingJE.create({
    data: {
      Asset: "Dec",
      hive: {
        connect: {
          id: 7,
        },
      },
    },
  });
  // const resAllBuys = await prisma.hive.findMany({
  //   where: { Transaction_Type: "BUY" },
  //   select: {
  //     dbid: true,
  //   },
  //   take: 3,
  // });
  // for (const element of resAllBuys) {
  //   const res2 = await prisma.hive.findUnique({
  //     where: {
  //       dbid: element.dbid,
  //     },
  //     select: {
  //       dbid: true,
  //       Asset_Type: true,
  //       Asset: true,
  //       From: true,
  //       To: true,
  //       Quantity: true,
  //       Basis_Date: true,
  //       Proceed_Date: true,
  //       Token_Price: true,
  //       Gross_Proceed: true,
  //       Cost_of_Basis: true,
  //       Net: true,
  //       Transaction_Type: true,
  //     },
  //   });
  //   console.log(res2?.dbid, res2?.Asset);
  //   let dHash = res2?.dbid;
  //   let aHash = res2?.Asset;
  //   // const buyJeCreate = await prisma.accountingJE.create({
  //   //   data: {
  //   //     dbid: res2?.dbid,
  //   //   },
  //   // });
  //   // console.log(buyJeCreate);
  // }
  // const user = await prisma.timisgod.create({
  //   data: {
  //     Asset: "Alice",
  //   },
  // });
  // console.log(user);
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
