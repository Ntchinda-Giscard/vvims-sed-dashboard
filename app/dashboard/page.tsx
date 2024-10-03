"use client"
import Image from "next/image";
import classes from "@/app/dashboard/components/css/dashboard.module.css"
import cx from 'clsx'
import { Poppins } from "next/font/google";
import CardDashboard from "./components/cardDashboard";
import GraphSection from "./components/graphSection";
import LoogedCars from "./components/loogedCars";
import RecentVisitoTable from "./components/recentVisitorTable";
import { useEffect } from "react";
import img_p from "@/public/assets/visit.svg";
import img_c from "@/public/assets/cars.svg";
import img_cf from "@/public/assets/flaged_cad.svg";

import bg_r from "@/public/assets/bg_card_r.svg";
import bg_g from "@/public/assets/bg_card_g.svg";
import bg_b from "@/public/assets/bg_card_b.svg";




const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Home() {
  const card_info = [
    {title: "Total visitor", amount: 0, perc: 12, bg_img: bg_b, img: img_p},
    {title: "Total Vehicles", amount: 0, perc: 12, bg_img: bg_g, img: img_c},
    {title: "Flagged Vehicles", amount: 0, perc: 12, bg_img: bg_r, img: img_cf},
  ]
  useEffect(() =>{
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
  },[])
  return (
    <main className="flex min-h-full flex-col gap-3">
      <p className={cx([classes.heading, font_heading.className])}> Dashboard </p>
      <div className="flex flex-row justify-center gap-3">
        {
          card_info.map((c) =>(
            <CardDashboard
              key={c?.title}
              title={c?.title}
              amount={c?.amount}
              bg_img={c?.bg_img}
              img={c?.img} 
              perc={c?.perc}            
            />
          ))
        }

      </div>
      
      <div className="flex flex-row gap-3">
        <div className="flex w-3/4">
          <GraphSection />
        </div>
        <div className="flex w-2/4">
          <LoogedCars />
        </div>
      </div>
      <RecentVisitoTable />
    </main>
  );
}
