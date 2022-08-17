//practice using the loader data function in remix see "map.tsx"
// this page to be deleted
//https://www.youtube.com/watch?v=NXqEP_PsPNc

import { useLoaderData } from "@remix-run/react"

export async function loader() {
    return [
        {
            id: "3984093",
            firstName: "tim",
        },
        {
            id: "3993",
            firstName: "andrew",
        },
        {
            id: "31",
            firstName: "steve",
        },
    ]
}

export default function People() {
    let people = useLoaderData()

    return (
        <main style={{ lineHeight: "5" }}>
            <h1>Here are your people</h1>

            {people.length ? (
                <ul>
                    {people.map((person) => (
                        <li key={person.id}>
                            {person.firstName}
                        </li>
                    ))}

                </ul>
            ) : (<p> nope </p>)}


        </main>

    )


}