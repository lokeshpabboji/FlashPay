"use server"
import bcrypt from "bcrypt"
import prisma from "@repo/db/client"

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