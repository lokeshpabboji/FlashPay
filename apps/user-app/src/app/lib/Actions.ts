"use server"
import bcrypt from "bcrypt"
import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export async function passwordVerification(password : string, userId :number) : Promise<boolean> {
    // should add zod validation here
    const user = await prisma.user.findUnique({
        where : {
            id : userId
        }
    })
    if(user !== null){
        const passwordValidate = await bcrypt.compare(password, user?.password)
        return passwordValidate;
    }else{
        return false;
    }
}

export async function createOnRampTxn({userId, provider, amount, startTime, token} : {
    userId : number,
    provider : string,
    amount : number,
    startTime : string,
    token : string
}){
    await prisma.onRampTransaction.create({
        data : {
            userId,
            provider,
            status : "Processing", 
            amount,
            startTime,
            token
        }
    });
}

export async function p2pTransfer(to: string, amount: number, password : string) {
    const session = await getServerSession(authOptions);

    const from = session?.user?.id;
    if (!from)  return { message: "Error while sending"}

    const passwordValidation = await passwordVerification(password, Number(from))
    if(!passwordValidation) return { message : "incorrect password" }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });
    if (!toUser) return { message: "User not found" }
    
    try {
        await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }
    
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });
    
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });
        });
        return {
            message : "transaction successfull"
        }
    } catch (error) {
        console.log(error)
        return {
            message : "transaction failed or Insufficient funds"
        }
    }
}