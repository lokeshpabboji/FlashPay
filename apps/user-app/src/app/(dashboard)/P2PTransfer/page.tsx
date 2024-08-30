'use client'

import { Button, Card, Center, TextInput } from "@repo/ui";
import { useState } from "react";
import { p2pTransfer } from "../../lib/Actions";

export default function() {
    const [number, setNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [password, setPassword] = useState("")

    return (
        <div className="w-full">
            <div className="text-center text-4xl py-3 px-6 text-indigo-700">
                Profile
            </div>
            <div className="m-5 grid grid-cols-1">
                <Center className="">
                    <Card className={`${isButtonClicked ? "visible":"hidden"} w-7/12`} title="password">
                        <div className="text-center text-sm">Enter your password to send Money</div>
                        <TextInput value={password} label="Password" type="password" placeholder="******" onChange={(value) => {
                            setPassword(value)
                        }}/>
                        <Button className="mt-4" onClick={async () => {
                            const response = await p2pTransfer(number, Number(amount)*100, password)
                            alert(response.message);
                            console.log(response)
                            setPassword(""); setIsButtonClicked((val) => !val);
                            setAmount(""); setNumber("")
                            return;
                        }}>Verify and Add</Button>
                    </Card>
                    <Card className={`${!isButtonClicked ? "visible":"hidden"} w-7/12`} title="Send Money to user">
                        <TextInput label="number" type="number" value={number} placeholder="phone number here" onChange={(val) =>{
                            setNumber(val)
                        } } />
                        <TextInput label="amount" type="number" value={amount} placeholder="amount here" onChange={(val) => {
                            setAmount(val)
                        }}/>
                        <div className="flex my-4 mx-24">
                            <Button className="" onClick={() => {
                                if (!amount || Number(amount) <= 0 || !number) {
                                    alert('Please enter valid inputs.');
                                    return;
                                }
                                setIsButtonClicked((value) => !value)
                            }}>Send</Button>
                        </div>
                    </Card>
                </Center>
            </div>
        </div>
    )
}