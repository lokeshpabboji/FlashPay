"use client"

import { ReactNode } from "react";

interface buttonProps{
    className : string,
    children : ReactNode,
    onClick : () => void
}

export const Button = ({className, onClick, children} : buttonProps) => {
    return (
        <button onClick={onClick} type="button" className={`${className} text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300 font-semibold rounded-lg text-sm px-5 py-2.5 me-2`}>
            {children}
        </button>
    )
}