import "./globals.css";
import "@repo/ui/styles.css"
import type { Metadata } from "next";
import { Inter } from "next/font/google"
import { Providers } from "./Provider";
import { AppbarClient } from "./AppbarClient";

const inter = Inter({subsets : ["latin"]})

export const metadata : Metadata = {
  title : "Wallet",
  description : "simple wallet app"
}

export default function RootLayout({ children }: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body className={`bg-stone-100 ${inter.className}`}>
          <AppbarClient />
          { children }
        </body>
      </Providers>
    </html>
  );
}
