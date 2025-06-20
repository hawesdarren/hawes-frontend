import type { Metadata } from "next";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import "./checkbox_styles.css"

const geistSans = Geist({
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
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
      <Head>
        <meta name="viewport" content="width=device-wdth, initial-scale=1.0" />
      </Head>
      <body>

        <div className="grid grid-cols-1 w-dvw max-w-200 min-h-dvh justify-self-center">
          {children}
        </div>

      </body>
    </html>
  );
}
