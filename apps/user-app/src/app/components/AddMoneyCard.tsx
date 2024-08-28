'use client'
import { Button, Card, Select, TextInput } from "@repo/ui";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAmount, useIsButtonClicked, useUrl } from "@repo/store"
import { useState } from "react";
import { passwordVerification } from "../lib/passwordAction";

const SUPPORTED_BANKS = [{
    name : "HDFC Bank",
    redirectUrl : "https://netbanking.hdfcbank.com"
},{
    name : "Axis Bank",
    redirectUrl : "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectedUrl] = useUrl();
    const [amount, setAmount] = useAmount();
    const session = useSession();
    const [password, setPassword] = useState("")
    const [isButtonClicked, setIsButtonClicked] = useIsButtonClicked()
    return (
        <>
            <Card className={`${isButtonClicked ? "visible":"hidden"} w-full`} title="password">
                <div className="text-center text-sm">Enter your password to Add Money to your wallet</div>
                <TextInput label="Password" type="password" placeholder="******" onChange={(value) => {
                    console.log(value);
                    setPassword(value)
                }}/>
                <Button className="mt-4" onClick={async () => {
                    // setIsButtonClicked(value => !value)
                    // @ts-ignore
                    const passwordValidation = await passwordVerification(password, Number(session.data?.user?.id))
                    if(passwordValidation){
                        axios.post("http://localhost:3003/hdfcwebhook", {
                            amount,
                            // @ts-ignore
                            user_id : session.data?.user?.id,
                            token : 'webhookToken'
                        }).then(response => {
                            console.log("in response block");
                            const statusCode = response.status
                            if(statusCode == 200){
                                alert('Money Added to your wallet')
                            }else if(statusCode == 411){
                                alert('request failed! try again in some time')
                            }
                            console.log('Response:', response.data);
                        })
                        .catch(error => {
                            console.log("in catch block");
                            alert('request failed! try again in some time 1')
                            console.error('Error:', error);
                        }).finally(() => {
                            setIsButtonClicked(value => !value)
                        })
                    }else {
                        alert('request failed! try again in some time 2')
                    }
                }}>Verify and Add</Button>
            </Card>
            <Card className={`${isButtonClicked ? "hidden":"visible"}`} title="Add Money">
                <div className="w-full">
                    <TextInput type="number" label="Amount" placeholder="Amount" onChange={(amount) => {
                        setAmount(Number(amount))
                    }} />
                    <div className="py-4 text-left">
                        Bank
                    </div>
                    <Select onSelect={(value) => {
                        setRedirectedUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || '')
                    }} options={SUPPORTED_BANKS.map(x => ({
                        key : x.name,
                        value: x.name
                    }))}
                    />
                    <Button className="mt-4" onClick={async () => {
                        console.log("in button component")
                        if (!amount || amount <= 0) {
                            alert('Please enter a valid amount.');
                            return;
                        }
                        if (!session) {
                            alert('You need to be logged in to add money.');
                            return;
                        }
                        setIsButtonClicked((value) => !value)
                        // @ts-ignore
                        // console.log(session.data?.user?.id)
                    }}>Add Money</Button>
                </div>
            </Card>
        </>
    )
}