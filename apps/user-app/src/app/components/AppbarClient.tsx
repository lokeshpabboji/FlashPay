"use client"

import { AppBar } from "@repo/ui";
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"



export function AppbarClient() {
    const session = useSession()
    const router = useRouter();
    return (
        <AppBar user={session.data?.user} onSignin={signIn} onSignout={async () => {
            await signOut({callbackUrl : '/signin'})
        }}></AppBar>
    )
}