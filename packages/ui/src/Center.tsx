import { ReactNode } from "react";

export function Center({children, className} : {className :string,children : ReactNode}) : JSX.Element {
    return (
        <div className={`${className} flex justify-center flex-col h-full`}>
            <div className="flex justify-center">
                {children}
            </div>
        </div>
    )
}