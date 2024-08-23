import express  from "express";
import prisma from "@repo/db/client";
const app = express();


app.use(express.json())

app.post("/hdfcwebhook",async (req, res) => {
    // Add zod validation here
    const paymentInfo : {
        token : string,
        userId : string,
        amount : string,
    } = {
        token : req.body.token,
        userId : req.body.user_id,
        amount : req.body.amount
    }

    // update the balance in db, add txn
    try {
        await prisma.$transaction([
            prisma.balance.update({
                where : {
                    userId : Number(paymentInfo.userId),
                },
                data : {
                    amount : {
                        increment : Number(paymentInfo.amount)
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where : {
                    token : paymentInfo.token
                },
                data : {
                    status : "Success"
                }
            }),
        ])
        res.json({
            message : "Captured"
        })
    } catch (error) {
        console.error(error);
        res.status(411).json({
            message : "Error while processing webhook"
        })
    }
})

app.listen(3003);