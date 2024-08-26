import { Card } from "@repo/ui/Card"

export const BalanceCard = ({amount, locked} : {
    amount : number,
    locked : number
}) => {
    return (
        <Card className="" title="Balance">
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>Unlocked Balance</div>
                <div>{amount} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>Locked Balance</div>
                <div>{locked} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>Total Balance</div>
                <div>{(amount+locked)} INR</div>
            </div>
        </Card>
    )
}