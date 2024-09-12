import Image from "next/image";
import classes from "@/app/components/css/dashboard.module.css"
import cx from 'clsx'
import { Poppins } from "next/font/google";
import { card_info } from "./components/card_info";
import CardDashboard from "./components/cardDashboard";
import GraphSection from "./components/graphSection";
import LoogedCars from "./components/loogedCars";

const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Home() {
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
        <div className="flex w-1/4">
          <LoogedCars />
        </div>

      </div>
    </main>
  );
}
