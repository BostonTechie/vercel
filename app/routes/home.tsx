//https://www.youtube.com/watch?v=Mx9Xsq9JNXo&t=0s

import { requireUserId } from "~/utlis/auth.server";
import { LoaderFunction } from "@remix-run/node";
import { Link } from "@remix-run/react"


// export const loader: LoaderFunction = async ({ request }) => {
//     await requireUserId(request)
//     return null
// }

export default function Home() {
    return (<>
        <h2>hi i am home page, I am under construction</h2>

        <Link to="../hive" style={{ color: "blue" }}>Click here for the hive data</Link>
    </>
    )
}

