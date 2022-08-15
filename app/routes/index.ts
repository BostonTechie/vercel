//https://www.youtube.com/watch?v=Mx9Xsq9JNXo&t=0s

import { requireUserId } from "~/utlis/auth.server";
import { LoaderFunction, redirect } from "@remix-run/node";


export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return redirect('/home')
}


