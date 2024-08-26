import { Button } from "./Button"
import { redirect } from "next/navigation";

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
    return (
        <div className="flex justify-between border-b px-4 ">
            <div onClick={()=>{
                console.log('from FlashPay div');
                redirect('/dashboard')
            }} className="text-lg font-semibold text-indigo-500 hover:text-indigo-600 hover:cursor-pointer flex flex-col justify-center">
                FlashPay
            </div>
            <div className="flex flex-col justify-center pt-2">
                <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
            </div>
        </div>
    )
}