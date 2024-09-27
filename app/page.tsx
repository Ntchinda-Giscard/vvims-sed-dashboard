"use client"
import Image from "next/image";

import classes from "@/app/components/css/dashboard.module.css"
import cx from 'clsx'
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard")
  }, []);

  return (
    <main className="flex min-h-full flex-col gap-3">

    </main>
  );
}
