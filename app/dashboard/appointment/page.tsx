"use client"
import { Button, Paper, Select } from "@mantine/core";
import { StatsGridIcons } from "./components/stats_card";
import AppointmentTable from "./components/appointmentTable";
import { useState } from "react";
import { DateInput } from "@mantine/dates";
import { useSubscription } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_APPOINTMENT } from "./query/query";
import { useDisclosure } from '@mantine/hooks';
import AddAppoinmentModal from "./components/addApointmentModal";

function Page() {
    const [date, setDate] = useState<Date | null>(null);
    const [value, setValue] = useState<string | null>('');
    const user = useSelector((state: any) => state.auth.userInfo);

    const [openedAddApp, { open: openAdd, close: closeAdd }] = useDisclosure(false);

    const {data: dataApp, loading: loddApp, error: errApp} = useSubscription(GET_APPOINTMENT,{
        variables:{
            company_id: user?.employee?.company_id
        }
    })


    return ( <>
       <main className="flex flex-col min-w-full min-h-full">
        <AddAppoinmentModal
            opened={openedAddApp}
            close={closeAdd}
        />
            <div className={"flex flex-col  md:flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Appointment </p>
                        <Button  color={"#16DBCC"} onClick={openAdd} >
                            Add Appointment
                        </Button>
                </div>
                <StatsGridIcons />
                <Paper mt="lg" radius="md" shadow="md" p="md" >
                    <div className="flex gap-3 md:flex-row flex-col md:justify-start">
                        <DateInput
                            value={date}
                            onChange={setDate}
                            label="Date"
                            styles={{
                                label:{
                                    color: "#404040"
                                },
                                calendarHeader:{
                                    color: "#000"
                                },
                                calendarHeaderControl:{
                                    color: "#000"
                                }
                            }}
                        />
                        <Select 
                            label="Status"
                            data={["CANCELED", "COMPLETED"]} 
                            value={value} onChange={setValue}
                            styles={{
                                label:{color: "#404040"},
                                option:{color: "#404040"}
                            }}
                        />

                    </div>
                    <AppointmentTable 
                        datas={dataApp?.appointments}
                    />
                </Paper>
            </main>
    </> );
}

export default Page;