import prisma  from "@repo/db/client"
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt  from "bcrypt"

export const authOptions = {
    providers : [
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                phone : {label : "Phone number", placeholder : '9328472', type : 'text'},
                password : {label : "Password", placeholder : '*******', type : 'password'},
            },
            // TODO : user credentials type from next-auth
            async authorize(credentials: any) {
                // Do zod validation, OTP validation here
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                const existingUser = await prisma.user.findFirst({
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
                            number: existingUser.number
                        }
                    }
                    return null;
                }
    
                try {
                    await prisma.$transaction(async (tx) => {
                        const user = await prisma.user.create({
                            data: {
                                number: credentials.phone,
                                password: hashedPassword,
                            }
                        });
                        await prisma.balance.create({
                            data : {
                                userId : user.id,
                            }
                        })
                        return {
                            id: user.id.toString(),
                            name: user.name,
                            number: user.number
                        }
                    })
                    
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
    },
    pages: {
        signIn: '/signin',  // Custom sign-in page
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
    }
}