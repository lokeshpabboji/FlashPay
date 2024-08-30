'use client'
import { Button } from "./Button"
import { useRouter } from "next/navigation";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const AppBar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) : JSX.Element => {
    const router = useRouter()
    return (
        <div className="sticky top-0 backdrop-blur-md flex justify-between border-b px-4 ">
            <div className="flex justify-between">
                <div className="flex flex-col justify-center pr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                    </svg>
                </div>
                <div onClick={()=>{
                    router.push('/dashboard')
                }} className="text-lg font-semibold text-violet-500 hover:text-violet-600 hover:cursor-pointer flex flex-col justify-center">
                    FlashPay
                </div>
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button className="mb-2" onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}