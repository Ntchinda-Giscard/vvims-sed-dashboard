import Image from "next/image";
import classes from "@/app/components/css/dashboard.module.css"
import cx from 'clsx'
import { Poppins } from "next/font/google";
import { card_info } from "./(dashboard)/components/card_info";
import CardDashboard from "./(dashboard)/components/cardDashboard";
import GraphSection from "./(dashboard)/components/graphSection";
import LoogedCars from "./(dashboard)/components/loogedCars";
import RecentVisitoTable from "./(dashboard)/components/recentVisitorTable";


const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });

export default function Home() {
  return (
    <main className="flex min-h-full flex-col gap-3">

    </main>
  );
}
