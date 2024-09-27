"use client"
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import Providers from "../provider";
import ResponsiveSizes from "./components/appshell";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";


const inter = Poppins({ subsets: ["latin"], weight:["500"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ResponsiveSizes>
            {children}
          </ResponsiveSizes>
        </Providers>
      </body>
    </html>
  );
}
