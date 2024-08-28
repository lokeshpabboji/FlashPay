'use client'

import { Button, Card, Center, TextInput } from "@repo/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Signin() {
    
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignin = async (provider : string) => {
        // Optional: Perform validation on phone and password before submitting
    
        try {
          const result = await signIn('credentials', {
            redirect: false, // Prevent automatic redirection
            phone,
            password,
          });
    
          if (result) {
            // Successful sign-in, handle it here (e.g., redirect)
            console.log('Sign in successful');
            router.push('/')
          } 
        } catch (error) {
          console.error(error);
          console.error('An unexpected error occurred.'); // Generic error message
        }
      };

    return (
        <div className="flex flex-col items-center justify-center h-screen pt-16">
            <Center className="">
                <Card title="Signin" className="w-96">
                    <div className="text-3xl text-center font-sans font-extrabold text-blue-400">
                        FlashPay
                    </div>
                    <TextInput type="text" placeholder="phone" label="Phone Number" onChange={(value) => {
                        setPhone(value)
                    }}></TextInput>
                    <TextInput type="password" placeholder="password" label="Password" onChange={(value) => {
                        setPassword(value)
                    }}></TextInput>
                    <div className="pt-4">
                        <Button className="" onClick={() => handleSignin('Credentials')}>Signin</Button>
                    </div>
                </Card>
            </Center>
        </div>
    )
}