import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let myArray = [4, 5, 6];

  const res = await prisma.hive.findMany({
    where: { Transaction_Type: "BUY" },
    select: {
      dbid: true,
    },
    take: 3,
  });

  console.log("my array", myArray, " my response 1", res[0]);

  const res2 = await prisma.hive.findMany({
    where: {
      dbid: res[0].dbid,
    },
    select: {
      dbid: true,
      Asset: true,
    },
  });

  console.log(res2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
