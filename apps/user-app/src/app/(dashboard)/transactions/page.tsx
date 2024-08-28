import { OnRampTransactions } from "../../components/OnRampTransactions";
import { getOnRampTransactions } from "../../lib/getOnRampTransactions";

export default async function() {
    const txns = await getOnRampTransactions()
    return (
        <div className="w-full">
            <div className="text-4xl py-3 px-6 text-indigo-700">
                Transactions
            </div>
            <div className="m-5">
                <OnRampTransactions transactions={txns}></OnRampTransactions>
            </div>
        </div>
    )
}