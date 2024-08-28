
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";


export const GET = async () => {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({
            message: "You are not logged in or session data is incomplete",
        });
    }
    
    try {
        console.log(session.user.id)
        const user = await prisma.user.findUnique({
            where : {
                id : Number(session.user.id)
            }
        })
        if(!user){
            return NextResponse.json({
                message : "user not found"
            })
        }
        return NextResponse.json({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.number,
        });
    } catch (e) {
        console.error("Error fetching user data:", e);
        return NextResponse.json({
        message: "An error occurred while fetching user data",
        }, { status: 500 });   
    }
}