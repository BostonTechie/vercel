//https://www.youtube.com/watch?v=Mx9Xsq9JNXo&t=0s

import { requireUserId } from "~/utlis/auth.server";
import { LoaderFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

export default function Home() {
    return (
        <h2>hi home page</h2>

    )
}

