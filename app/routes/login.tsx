//https://www.youtube.com/watch?v=vR33ZRJekHk


import { Layout } from "~/components/layout"
import { FormField } from "~/components/form-field"
import { useState } from 'react'

export default function Login() {


    const [action, setAction] = useState(
        'login'
    )


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setFormData(form => ({
            ...form,
            [field]: event.target.value
        }))
    }

    return (
        <Layout>
            {/* if you want to see your on change event */}

            on change form data
            <br />
            {
                JSON.stringify(formData)
            }

            <div className="h-full flex justify-center items-center flex-col gap-y-4">

                <div className="rounded-2xl bg-gray-200 p-6 w-60 gap-y-4">
                    <form>
                        <FormField
                            htmlFor="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={e => handleInputChange(e, 'email')}
                        />

                        <FormField
                            htmlFor="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={e => handleInputChange(e, 'password')}
                        />
                        {action === 'login' ? (

                            <button
                                type="submit"
                                name="_action"
                                value={action}
                                className="w-full rounded bg-blue-500 py-2 px- text-white hover:bg-blue-700 focus:bg-blue-400"
                            >
                                Log in
                            </button>
                        ) : (
                            <button
                                type="submit"
                                name="_action"
                                value={action}
                                className="w-full rounded bg-blue-500 py-2 px- text-white hover:bg-blue-700 focus:bg-blue-400"
                            >
                                Sign in
                            </button>)}

                    </form>

                </div>
                <button
                    onClick={() => setAction(action == 'login' ? 'sign-up' : 'login')}
                    type="submit" className="rounded bg-blue-500 py-2 px- text-white hover:bg-blue-700 focus:bg-blue-400" >Already have an account?
                </button>
            </div>
        </Layout>

    )
}