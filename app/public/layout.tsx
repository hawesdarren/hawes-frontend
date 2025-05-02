import type { Metadata } from "next";
import Head from "next/head";
import Header from "../components/header"
//import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css";

/*const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hawes Test Enginering App",
  description: "Test enginnering exercises",
  
};*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    /*<html lang="en">
      <Head>
        <meta name="viewport" content="width=device-wdth, initial-scale=1.0" />
      </Head>*/
      
        <div className="grid grid-rows-[minmax(0px,60px)_auto_1fr]">
            <div className="order-1">
                <Header/>
            </div>
            <div className="order-2">
                {children}
            </div>
            <div className="grid content-end order-3">
                Footer
            </div>
          
        </div>

      
    //</html>
  );
}
