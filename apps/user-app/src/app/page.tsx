import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function Page(){
  const session = await getServerSession(authOptions);
  if (session?.user) {
    console.log('from if in main page')
    redirect('/dashboard')
  } else {
    console.log('from else in main page')
    redirect('/signin')
  }
}
