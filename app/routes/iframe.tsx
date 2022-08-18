//https://www.youtube.com/watch?v=Mx9Xsq9JNXo&t=0s
//the purpose of this template is to easyily create a new route the already has the Sidebar compnent in it as well as checking if the user is logged in

//You may need to import prisma or other requirements based on nature of route
import defiImg from "../images/DeFi_Logo.png"
import { Link } from "@remix-run/react"
import { requireUserId } from "~/utils/auth.server";
import { LoaderFunction } from "@remix-run/node";
import { Layout } from "~/components/layout";
import { Sidebar } from '~/components/sidebar'

//@1hr 9min https://www.youtube.com/watch?v=vR33ZRJekHk
export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

export default function Home() {
    return (<Layout>
        <Sidebar />
        <div className="mt-8 flex flex-col float-right w-9/12">
            <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle">

                    {/* put your data into the main section below */}

                    <main ><h2>hi i am home page, I am under construction</h2>

                        <p><Link to="../hive" style={{ color: "blue" }}>Click here for the hive data</Link></p><p>or hit the reports icon to the left to make a new query</p></main>
                    <iframe id="inlineFrameExample"
                        title="Inline Frame Example"
                        width="300"
                        height="200"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
                    </iframe>

                </div>
            </div>
        </div>
    </Layout>
    )
}
