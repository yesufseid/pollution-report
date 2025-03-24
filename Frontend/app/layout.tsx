

import { ThemeProvider } from "next-themes";
import Header from "./component/Header"
import "./globals.css";



export const metadata = {
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="p-0 m-0">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > */}
          <Header />
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
