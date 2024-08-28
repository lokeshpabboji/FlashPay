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
    const token : string = req.body.token
    console.log("in hdfcwebhook", token);
    if(!token){
        return res.status(411).json({
            message : "unAuthorized"
        })
    }

    // update the balance in db, add txn
    try {
        console.log("in try block");
        await prisma.$transaction(async (tx) => {
            const onRampTxn = tx.onRampTransaction.update({
                where : {
                    token : token
                },
                data : {
                    status : "Success"
                }
            });
            console.log((await onRampTxn).amount)
            console.log((await onRampTxn).userId)
            await tx.balance.update({
                where : {
                    userId : (await onRampTxn).userId,
                },
                data : {
                    amount : {
                        increment : (await onRampTxn).amount
                    }
                }
            });
            return res.json({
                message : "Captured"
            })
        })
    } catch (error) {
        console.error(error);
        prisma.onRampTransaction.update({
            where : {
                token : token
            },
            data : {
                status : "Failure"
            }
        });
        return res.status(411).json({
            message : "Error while processing webhook"
        })
    }
})

app.listen(3003, () => {
    console.log("app is listening on port 3003")
});