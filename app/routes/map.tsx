//practice using the loader data function in remix see people tsx
// this page to be deleted

import { Link } from "@remix-run/react"

export default function map() {
    return (
        <main
            style={{ lineHeight: "5" }} >
            <h1> welcome to remix this link is where I test out the loader functionaility and map over it</h1>

            <Link to="../people" style={{ color: "blue" }}>People constant</Link>
            <br></br>
            <Link to="../google" style={{ color: "blue" }}>ignfddfg please</Link>
        </main>

    )

}