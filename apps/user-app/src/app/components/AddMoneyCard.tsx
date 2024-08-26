'use client'
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useAmount, useUrl } from "@repo/store"

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
    return (
        <Card className="" title="Add Money">
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
                <Center className="mt-6">
                    <Button onClick={() => {
                        console.log("in button component")
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
                </Center>
            </div>
        </Card>
    )
}