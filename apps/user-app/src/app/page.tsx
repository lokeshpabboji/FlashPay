import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
// interface CustomSession {
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     image?: string;
//   };
//   expires: string;
// }
export default async function Page(){
  const session = await getServerSession(authOptions)// as CustomSession;
  console.log("form main page.tsx")
  // console.log(session.user)
  if (session?.user) {
    redirect('/dashboard')
  } else {
    redirect('/signin')
  }
}
