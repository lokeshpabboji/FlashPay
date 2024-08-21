import { NextResponse } from "next/server";
import { PrismaClient } from "@repo/db/client"

const client = new PrismaClient();

export const GET = async () => {
    await client.user.create({
        data : {
            email : 'lokeshpabboji@gmail.com',
            name : 'lokesh'
        }
    })

    return NextResponse.json({
        message : 'user created successfully'
    })
}