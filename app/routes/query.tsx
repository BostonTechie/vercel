import { requireUserId } from "~/utlis/auth.server";
import { LoaderFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

export default function Query() {
    return (
        <h2>I am the query page</h2>

    )
}