import { PrismaClient } from "@repo/db/client"
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt  from "bcrypt"

const client = new PrismaClient()

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                phone : {label : "Phone number", placeholder : '9328472', type : 'text'},
                name : {label : "name", placeholder : 'your name here', type : 'text'},
                email : {label : "email", placeholder : 'your email here', type : 'text'},
                password : {label : "Password", placeholder : '*******', type : 'password'},
            },
            // TODO : user credentials type from next-auth
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await client.user.findFirst({
                    where: {
                        number: credentials.phone
                    }
                });
    
                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.number
                        }
                    }
                    return null;
                }
    
                try {
                    const user = await client.user.create({
                        data: {
                            email : credentials.email,
                            number: credentials.phone,
                            password: hashedPassword,
                            name : credentials.name
                        }
                    });
                
                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.number
                    }
                } catch(e) {
                    console.error(e);
                }
    
                return null
              },
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
}