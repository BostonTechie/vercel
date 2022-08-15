//https://www.youtube.com/watch?v=vR33ZRJekHk

import { Form } from "@remix-run/react"
import { Layout } from "~/components/layout"
import { FormField } from "~/components/form-field"


export default function Login() {
    return (
        <Layout>
            <div className="h-full flex justify-center items-center flex-col gap-y-4">

                <Form method="post" className="rounded-2xl bg-gray-200 p-6 w-60 gap-y-4" noValidate>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email address
                    </label>

                    <input
                        autoFocus={true}
                        required
                        type="email"
                        id="email"
                        autoComplete="email"
                        className="w-full rounded border border-gray-500 px-2 py-1 text-lg">
                    </input>

                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        className="w-full rounded border border-gray-500 px-2 py-1 text-lg">
                    </input>

                    <button
                        type="submit"
                        className="w-full rounded bg-blue-500 py-2 px- text-white hover:bg-blue-700 focus:bg-blue-400"
                    >
                        Log in
                    </button>

                </Form>

            </div>
        </Layout>

    )
}