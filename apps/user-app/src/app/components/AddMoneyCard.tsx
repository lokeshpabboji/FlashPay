'use client'
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAmount, useIsButtonClicked, useUrl } from "@repo/store"

const SUPPORTED_BANKS = [{
    name : "HDFC Bank",
    redirectUrl : "https://netbanking.hdfcbank.com"
},{
    name : "Axis Bank",
    redirectUrl : "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectedUrl] = useUrl();
    const [amount, setAmount] = useAmount()
    const session = useSession();
    const [isButtonClicked, setIsButtonClicked] = useIsButtonClicked()
    return (
        <>
            <Card className={`${isButtonClicked ? "visible":"hidden"} w-full`} title="password">
                <div className="text-center text-sm">Enter your password to Add Money to your wallet</div>
                <TextInput label="Password" type="password" placeholder="******" onChange={() => {

                }}/>
                <Button className="mt-4" onClick={() => {
                    setIsButtonClicked(value => !value)
                }}>Verify</Button>
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
                    <Button className="mt-4" onClick={() => {
                        console.log("in button component")
                        setIsButtonClicked((value) => !value)
                        return;
                        if (!amount || amount <= 0) {
                            alert('Please enter a valid amount.');
                            return;
                        }
                        if (!session) {
                            alert('You need to be logged in to add money.');
                            return;
                        }
                        // @ts-ignore
                        // console.log(session.data?.user?.id)
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
                            alert('request failed! try again in some time')
                            console.error('Error:', error);
                        });
                    }}>Add Money</Button>
                </div>
            </Card>
        </>
    )
}