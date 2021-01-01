"use client"
import {Button, Paper} from "@mantine/core"
import StatsGrid from "@/app/dashboard/attendance/components/topCards";
import AttendanceTable from "./components/attendanceTable";
import { useSubscription } from "@apollo/client";
import { GET_ATTENDANCES } from "./queries/get_total_empl";
import { useSelector } from "react-redux";
import { useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";

function Page(){
    const user = useSelector((state: any) => state.auth.userInfo);
    const [activePage, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
    const {data: dataAtt, loading: loadAtt, error: errAtt} = useSubscription(GET_ATTENDANCES,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
        }
    })
    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <div className={"flex flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large"}}> Company Settings </p>
                    <Button bg={"#16DBCC"}>
                        View All Attendance
                    </Button>
                </div>
                <StatsGrid />
                <div className={"flex flex-row"}>
                    <div className={"flex w-2/3"}>

                    </div>
                    <div className={"flex w-1/3"}>

                    </div>

                </div>
                <Paper shadow="md" radius="md" p="md">
                    
                    {
                        loadAtt || errAtt ? <FullWidthSkeletonStack /> :
                        <AttendanceTable
                            datas={dataAtt?.attendance}
                         />
                    }
                </Paper>
            </main>
        </>
    )
}

export default Page