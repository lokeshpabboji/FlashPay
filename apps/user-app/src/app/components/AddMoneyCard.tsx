"use client"

import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/Card";
import { Center } from "@repo/ui/Center";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";

const SUPPORTED_BANKS = [{
    name : "HDFC Bank",
    redirectUrl : "https://netbanking.hdfcbank.com"
},{
    name : "Axis Bank",
    redirectUrl : "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectedUrl] = useState(SUPPORTED_BANKS[0].redirectUrl);
    const [amount, setAmount] = useState<number>(0)
    return (
        <Card title="Add Money">
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
                        window.location.href = redirectUrl || '';
                    }}>Add Money</Button>
                </Center>
            </div>
        </Card>
    )
}