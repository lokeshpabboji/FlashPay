"use client"

import { AppBar } from "@repo/ui";
import { signIn, signOut, useSession } from "next-auth/react"



export function AppbarClient() {
    const session = useSession()
    return (
        <AppBar user={session.data?.user} onSignin={signIn} onSignout={async () => {
            await signOut({callbackUrl : '/signin'})
        }}></AppBar>
    )
}