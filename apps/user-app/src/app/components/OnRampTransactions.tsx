import { Card } from "@repo/ui"


export const OnRampTransactions = ({
    transactions
} : {
    transactions : {
        time : Date,
        amount : number,
        // TODO : Can the type of 'status' be more specific?
        status : string,
        provider : string
    }[]
}) => {
    if(!transactions.length) {
        return (
            <Card className="" title="Recent Transactions">
                <div className="text-center pb-8 pt-8">
                    No Recent Transactions
                </div>
            </Card>
        )
    }
    return (
        <Card className="" title="Recent Transactions">
            <div className="overflow-y-auto h-80 pt-2">
                {transactions.map(t => 
                    <div className={`flex justify-between border-b mb-2 ${t.status === "Success" ? "text-green-400" : "text-red-600"}`}>
                        <div>
                            <div className="text-sm">Received INR From {t.provider}</div>
                            <div className="text-xm">{t.time.toDateString()}</div>
                        </div>
                        <div className="flex flex-col justify-center text-right">
                            <div>+ Rs {t.amount/100}</div>
                            <div>{t.status}</div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    )
} 