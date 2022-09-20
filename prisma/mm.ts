async function main() {

    let myArray = [4,5,6]

    const res = await prisma.hive.findMany({
        where: { Transaction_Type: "BUY" },
        select: {
            dbid: true,
        },
        take: 1,
    });

 
    
    myArray.forEach(ttelement => {
        
        console.log('here is element', ttelement[0].dbid)
  
        // const res2 =  prisma.hive.findUnique({
        //     where: {
        //         dbid: 5
        //     },
        //     select: {
        //        dbid: true,
        //         Asset: true
     
    }
           
          
        // });

        // console.log(res)
    

    // res.forEach((element) => {
    //     //  console.log( element)
    //     const res2 = prisma.hive.findFirst({
    //         where: element.dbid
    //     });
    //     console.log(res2);
    // });

    // for (let data of res){
    //     console.log(res.dbid)
    // }
}