import "./globals.css";
import { Providers } from "./Provider";

export default function RootLayout({ children }: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
