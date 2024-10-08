import { getServerSession } from "next-auth";
import { AddMoney, BalanceCard, OnRampTransactions } from "../../components";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { getOnRampTransactions } from "../../lib/getOnRampTransactions";

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();

    return (
        <div className="w-full">
            <div className="text-4xl py-3 px-6 text-indigo-700">
                Transfer
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
                <AddMoney></AddMoney>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked}/>
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    )
}

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findUnique({
        where : {
            userId : Number(session?.user?.id)
        }
    });
    return {
        amount : balance?.amount || 0,
        locked : balance?.locked || 0
    }
}