

//@1hr 9min https://www.youtube.com/watch?v=vR33ZRJekHk
import { requireUserId } from "~/utlis/auth.server";
import { LoaderFunction } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}