import Image from "next/image";
import classes from "@/app/components/css/dashboard.module.css"
import cx from 'clsx'
import { Poppins } from "next/font/google";

const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <p className={cx([classes.heading, font_heading.className])}> Dashboard </p>
    </main>
  );
}
