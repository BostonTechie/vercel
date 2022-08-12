//https://www.youtube.com/watch?v=vR33ZRJekHk


import { Layout } from "~/components/layout"
import { FormField } from "~/components/form-field"
import { useState } from 'react'
import { ActionFunction, json } from "@remix-run/node"
import { validateEmail, validatePassword } from '../utlis/validators.server'
import { login, register } from '~/utlis/auth.server'

// @47 min
export const action: ActionFunction = async ({ request }) => {
    const form = await request.formData()
    const action = form.get('_action')
    const email = form.get('email')
    const password = form.get('password')

    if (
        typeof action !== 'string' ||
        typeof email !== 'string' ||
        typeof password !== 'string') {
        return json({ error: `Invalid Form Data`, form: action }, { status: 400 })
    }


    // ignored some steps at 52 min
    const errors = {
        email: validateEmail(email),
        password: validatePassword(password),

    }

    if (Object.values(errors).some(Boolean))
        return json({ errors, fields: { email, password }, form: action }, { status: 400 })

    // validation ...

    switch (action) {
        case 'login': {
            return await login({ email, password })
        }
        case 'register': {

            return await register({ email, password })
        }
        default:
            return json({ error: `Invalid Form Data` }, { status: 400 });
    }


}


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

                <div >
                    <form className="rounded-2xl bg-gray-300 p-6 w-60 gap-y-4" method="post">
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
                        <br></br>
                        {action === 'login' ? (


                            <button
                                type="submit"
                                name="_action"
                                value={action}
                                className="w-full rounded bg-defi py-2 px- text-white hover:bg-blue-400 focus:bg-blue-400"
                            >
                                Log in
                            </button>
                        ) : (
                            <button
                                type="submit"
                                name="_action"
                                value={action}
                                className="w-full rounded bg-defi py-2 px- text-white hover:bg-blue-400 focus:bg-blue-400"
                            >
                                Sign up
                            </button>)}

                    </form>

                </div>

                {/* this button toggles between letting user sign up and logging in */}
                <button
                    onClick={() => setAction(action == 'login' ? 'sign-up' : 'login')}
                    type="submit" className="rounded bg-defi py-2 px- text-white hover:bg-blue-700 focus:bg-blue-400" >Sign me up!
                </button>
            </div>
        </Layout>

    )
}