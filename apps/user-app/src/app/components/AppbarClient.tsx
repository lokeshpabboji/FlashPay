"use client"

import { AppBar } from "@repo/ui/AppBar";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



export function AppbarClient() {
    const session = useSession()
    const router = useRouter();
    if(!session.data){
        router.push('/signin')
    }
    return (
        <AppBar user={session.data?.user} onSignin={signIn} onSignout={async () => {
            await signOut({callbackUrl : '/signin'})
        }}></AppBar>
    )
}