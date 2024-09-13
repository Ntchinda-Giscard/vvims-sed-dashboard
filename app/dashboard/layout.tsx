import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import "@/app/globals.css";
import Providers from "../provider";
import ResponsiveSizes from "./components/appshell";

const inter = Poppins({ subsets: ["latin"], weight:["500"] });

export const metadata: Metadata = {
  title: "Vvims Dashboard",
  description: "Secure visitor and vehicle managements",
};

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
