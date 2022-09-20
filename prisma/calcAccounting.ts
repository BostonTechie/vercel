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

  for (let i = 0; i < res.length; i++) {
    const res2 = await prisma.hive.findUnique({
      where: {
        dbid: res[i].dbid,
      },
      select: {
        dbid: true,
        Asset: true,
      },
    });
    console.log(res2);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
