"use client"
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/dates/styles.css';
import "./globals.css";
import Provider from "./provider";
import '@mantine/nprogress/styles.css';
import {usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Providers from "./provider";
import AuthState from "./auth_state";
import 'react-toastify/dist/ReactToastify.css';


const inter = Poppins({ subsets: ["latin"], weight:["500"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // router.push("/dashboard")


  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <Provider>
          <AuthState />
          {/* <ResponsiveSizes> */}  
            {children}
          {/* </ResponsiveSizes> */}
        </Provider>
        </Providers>
        
      </body>
    </html>
  );
}
