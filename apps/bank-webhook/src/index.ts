import express  from "express";
import prisma from "@repo/db/client";
const app = express();
import cors from "cors"

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    console.log("in route /");
    return res.json({
        message : "hello"
    })
})

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
    console.log("in hdfcwebhook", paymentInfo.amount, paymentInfo.token, paymentInfo.userId);
    if(paymentInfo.token !== 'webhookToken'){
        return res.status(411).json({
            message : "unAuthorized"
        })
    }

    // update the balance in db, add txn
    try {
        console.log("in try block");
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
            // prisma.onRampTransaction.update({
            //     where : {
            //         token : paymentInfo.token
            //     },
            //     data : {
            //         status : "Success"
            //     }
            // }),
        ])
        return res.json({
            message : "Captured"
        })
    } catch (error) {
        console.error(error);
        return res.status(411).json({
            message : "Error while processing webhook"
        })
    }
})

app.listen(3003, () => {
    console.log("app is listening on port 3003")
});