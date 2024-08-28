'use client'

import { useUserData } from "@repo/store"
import { Button, Card, Center, TextInput } from "@repo/ui";
import axios from "axios";
import { useEffect } from "react";

export default function() {
    const {userData, setUserData} = useUserData()
    useEffect(() => {
        axios.get("http://localhost:3000/api/user")
            .then(response => {
                setUserData(response.data)
            })
    },[])
    return (
        <div className="w-full">
            <div className="text-center text-4xl py-3 px-6 text-indigo-700">
                Profile
            </div>
            <div className="m-5 grid grid-cols-1">
                <Center className="">
                    <Card className="w-7/12" title="">
                        <TextInput label="name" isReadOnly={true} type="text" placeholder="No username" value={userData.name || ''} onChange={(value) => {}}/>
                        <TextInput label="email" isReadOnly={true} type="text" placeholder="No Email" value={userData.email || ''} onChange={(value) => {}}/>
                        <TextInput label="number" isReadOnly={true} type="text" placeholder="number here" value={userData.phone || ''} onChange={(value) => {}}/>
                        <div className="flex my-4 mx-24">
                            <Button className="mr-7" onClick={() => {}}>Edit</Button>
                            <Button className="ml-7" onClick={() => {}}>Save</Button>
                        </div>
                    </Card>
                </Center>
            </div>
        </div>
    )
}