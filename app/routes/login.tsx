//https://www.youtube.com/watch?v=vR33ZRJekHk


import { Layout } from "~/components/layout"
import { FormField } from "~/components/form-field"
import { useState } from 'react'


export default function Login() {

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

            <div className="h-full flex justify-center items-center flex-col gap-y-4">

                <div className="h-full flex justify-center items-center flex-col gap-y-4">
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

                        <button
                            type="submit"
                            className="w-full rounded bg-blue-500 py-2 px- text-white hover:bg-blue-700 focus:bg-blue-400"
                        >
                            Log in
                        </button>

                    </form>

                </div>
            </div>
        </Layout>

    )
}