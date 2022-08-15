//https://www.youtube.com/watch?v=NXqEP_PsPNc

import { PrismaClient } from '@prisma/client'
// import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
// import { hiveData } from "@prisma/client"
// import { json } from "@remix-run/node";

const prisma = new PrismaClient({})

// export const loader: LoaderFunction = async () => {
//     const gcpData: LoaderData = {
//         hiveData: await prisma.hive.findMany()
//     }
//     return json(gcpData)

// }

export default function Google() {
    const hiveData = useLoaderData<loaderData>()

    return (
        <main style={{ lineHeight: "5" }}>
            <h1>Here are your people</h1>

            {hiveData.length ? (
                <ul>
                    {hiveData.map((data) => (
                        <li key={data.dbid}>
                            {data.dbid}
                        </li>
                    ))}

                </ul>
            ) : (<p> nope </p>)}


        </main>
    )
}