import { requireUserId } from "~/utlis/auth.server";
import { LoaderFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

export default function Query() {
    return (
        <h2>hi i am home page, I am under construction</h2>

    )
}