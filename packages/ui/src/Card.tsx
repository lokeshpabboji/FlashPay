import { ReactNode } from "react";

export function Card({className, title, children} : {className: string, title : string, children? : ReactNode}) : JSX.Element{
    return (
        <div className={`border p-4 rounded-lg ${className}`}>
            <h1 className="text-xl text-center font-bold border-b pb-2">{title}</h1>
            <div>{children}</div>
        </div>
    )
}