
//@1hr 9min https://www.youtube.com/watch?v=vR33ZRJekHk

<!-- when you login trigger this -->
import { getUser } from "~/utlis/auth.server"
import { LoaderFunction, redirect } from "@remix-run/node";

//@1hr 9min https://www.youtube.com/watch?v=vR33ZRJekHk
export const loader: LoaderFunction = async ({ request }) => {
    return await getUser(request) ? redirect('/home') : null
}



<!-- protect the page  -->

import { LoaderFunction} from "@remix-run/node";

import { requireUserId } from "~/utlis/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return null
}
