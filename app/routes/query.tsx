//https://www.youtube.com/watch?v=Mx9Xsq9JNXo&t=0s
//the purpose of this template is to easyily create a new route the already has the Sidebar compnent in it as well as checking if the user is logged in

//You may need to import prisma or other requirements based on nature of route

import { Link } from "@remix-run/react"
import { requireUserId } from "~/utils/auth.server";
import { LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { Dropdown } from "~/components/dropdown"
import { Sidebar } from '~/components/sidebar'

//@1hr 9min https://www.youtube.com/watch?v=vR33ZRJekHk
export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

export default function Query() {
    return (
        <Layout>
            <Sidebar />
            <div className="mt-8 flex flex-col float-right w-9/12">
                <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                    <h1 className="font-bold">Query Data</h1>

                    {/* put your data into the main section below */}
                    <br></br><br></br>
                    <main >
                        <div className="inline-block min-w-full py-2 align-middle">

                            <div className="w-1/4">
                                <Dropdown />
                            </div>
                            <Link to="../hive" style={{ color: "blue" }}>
                                <p> Click here for the hive data</p></Link>
                        </div>
                    </main>
                </div>
            </div>



        </Layout >
    )
}
