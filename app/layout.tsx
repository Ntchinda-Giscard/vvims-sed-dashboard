import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import "./globals.css";
import ResponsiveSizes from "./dashboard/components/appshell";
import Provider from "./provider";

const inter = Poppins({ subsets: ["latin"], weight:["500"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {/* <ResponsiveSizes> */}
            {children}
          {/* </ResponsiveSizes> */}
        </Provider>
      </body>
    </html>
  );
}
