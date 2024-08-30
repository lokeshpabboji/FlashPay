import "./globals.css";
import "@repo/ui/styles.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Providers } from "./Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

const inter = Inter({subsets : ["latin"]})

export const metadata : Metadata = {
  title : "FlashPay",
  description : "simple wallet app"
}

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}): Promise<JSX.Element> {
  
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <html lang="en">
      <Providers>
        <body className={`bg-stone-100 ${inter.className}`}>
          { children }
        </body>
      </Providers>
    </html>
  );
}
