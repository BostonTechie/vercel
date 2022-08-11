// https://www.youtube.com/watch?v=vR33ZRJekHk  @ 12 min
import { useState, useEffect } from "react"


interface FormFieldProps {
    htmlFor: string,
    label: string,
    type?: string,
    value: any,
    onChange?: (...args: any) => any,
    error?: string
}

export function FormField({
    htmlFor,
    label,
    type = "text",
    value,
    onChange = () => { },
    error = ""

}: FormFieldProps) {
    const [errorText, setErrorText] = useState(error)

    useEffect(() => {
        setErrorText(error)
    }, [error])


    return <>
        <label htmlfor={htmlFor}>
            {label}
        </label>
        <input onChange={e => {
            onChange(e)
            setErrorText('')
        }} type={type} id={htmlFor} name={htmlFor} value={value} />
        <div>
            {errorText || ''}
        </div>
    </>
}