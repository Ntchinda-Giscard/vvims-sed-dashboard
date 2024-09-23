"use client"
import {Button, Group, Paper} from "@mantine/core"
import StatsGrid from "@/app/dashboard/attendance/components/topCards";
import AttendanceTable from "./components/attendanceTable";
import { useSubscription } from "@apollo/client";
import { GET_ATTENDANCES, GET_ATT_AGG } from "./queries/get_total_empl";
import { useSelector } from "react-redux";
import { useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";
import FootPage from "../components/fotter";
import { Poppins } from "next/font/google";
import AttendanceLineChart from "./components/attendanceLineChart";
import AttendanceBarChart from "./components/chartAttendance";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });

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

    const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_ATT_AGG,{
        variables:{
            company_id: user?.employee?.company_id,
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
                <div className={"flex flex-row min-w-full gap-3"}>
                    <div className={"flex w-3/5"}>
                        <Paper p="md" shadow="md" mt="lg" w="100%" radius="md">
                            <p style={{ fontSize: "medium", fontWeight: 500, marginBottom: 15 }}> Attendance Comparison Chart </p>
                            <AttendanceLineChart />
                        </Paper>
                    </div>
                    <div className={"flex w-2/5"}>
                        <Paper p="md" shadow="md" mt="lg" radius="md" w="100%">
                            <p style={{ fontSize: "medium", fontWeight: 500, marginBottom: 15 }}> On time Comparison Chart </p>
                            <AttendanceBarChart />
                        </Paper>
                    </div>
                </div>
                <Paper mt="lg" shadow="md" radius="md" p="md">
                    
                    {
                        loadAtt || errAtt ? <FullWidthSkeletonStack /> :
                        <AttendanceTable
                            datas={dataAtt?.attendance}
                         />
                    }
                    <Group justify="space-between" mt="md">
                        {
                        errAgg || loadAgg ? null :
                        <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
                        Displaying { dataAtt?.attendance?.length ? dataAtt?.attendance?.length*activePage : 0} of {dataAgg?.attendance_aggregate?.aggregate?.count} employees.
                        </p>}
                    {
                        errAgg || loadAgg ? null :
                        <FootPage 
                        activePage={activePage}
                        onPage={(v: any) => setPage(v)}
                        total={Math.ceil(dataAgg?.attendance_aggregate?.aggregate?.count/itemsPerPage)}
                        />
                    }
                    </Group>
                </Paper>
            </main>
        </>
    )
}

export default Page