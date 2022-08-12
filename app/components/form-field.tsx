// https://www.youtube.com/watch?v=vR33ZRJekHk  @ 12 min

// this form field is the basic setup for the fields used for login and sign-up forms at the login.tsx route


import { useState, useEffect } from "react"

interface FormFieldProps {
    htmlFor: string,
    label: string,
    type?: string,
    autoComplete?: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string
}

export function FormField({
    htmlFor,
    label,
    type = "text",
    value,
    autoComplete = "email",
    onChange = () => { },
    error = ""

}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])


    return <>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
            {label}
        </label>

        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }}
            type={type}
            id={htmlFor}
            name={htmlFor}
            value={value}
            autoComplete={autoComplete}
            required
            className="w-full rounded border border-gray-500 px-2 py-1 text-lg" />
        <div>
            {errorText || ''}
        </div>
    </>
}