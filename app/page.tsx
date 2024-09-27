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
    const askNotificationPermission = async () => {
      if (!('Notification' in window)) {
        console.log('This browser does not support notifications.');
        return;
      }

      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        // Optionally, you can show an initial notification here
        // new Notification("You will receive notifications!");
      } else {
        console.log('Notification permission denied.');
      }
    };

    // Call the function to request permission
    askNotificationPermission();
    router.push("/dashboard")
  }, []);

  return (
    <main className="flex min-h-full flex-col gap-3">

    </main>
  );
}
