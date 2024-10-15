import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ShowComponent from "@/components/ShowComponent/ShowComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "P.M4.",
  description: "Este es un proyecto del modulo M4 de henry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ShowComponent>
        <Navbar/>
      </ShowComponent>
        {children}
      <Footer/>
      </body>
    </html>
  );
}
