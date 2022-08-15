import { json } from "@remix-run/node"; // or cloudflare/deno
import { useLoaderData } from "@remix-run/react";
import { prisma } from '../utlis/prisma.server'

export async function loader() {
    const res = await prisma.hive.findMany({
        where: {},
    })

    return json(res);
}

export default function GistsRoute() {
    const gists = useLoaderData();
    return (
        <ul>
            {gists.map((gist) => (
                <li key={gist.dbid}>
                    <a href={gist.dbid}>{gist.dbid}</a>
                </li>
            ))}
        </ul>
    );
}