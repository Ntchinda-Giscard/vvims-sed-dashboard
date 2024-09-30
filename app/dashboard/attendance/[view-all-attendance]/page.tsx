"use client"
import { useRouter } from "next/navigation";
import { useSubscription } from "@apollo/client";
import { GET_ATTENDANCES_ALL, GET_ATTENDANCES_ALL_AGG } from "../queries/get_total_empl";
import { ActionIcon, Group, NumberInput, Paper, TextInput, rem } from "@mantine/core";
import { useState, useEffect } from "react";
import { DateInput, MonthPickerInput } from "@mantine/dates";
import { useSelector } from "react-redux";
import ViewAttendanceTable from "../components/viewAllAttentanceTable";
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import FullWidthSkeletonStack from "../../components/defaultTable";
import FootPage from "../../components/fotter";
import { Poppins } from "next/font/google";


const poppins = Poppins({ subsets: ["latin"], weight:["400"] });
function Page( {params }: { params: { slug: string } }) {
    const today = new Date();

// Get the first day of the current month
const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
const formattedFirstDay = firstDayOfCurrentMonth.toISOString().split('T')[0];



// Get the last day of the current month
const lastDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
const formattedLastDay = lastDayOfCurrentMonth.toISOString().split('T')[0];


    const router = useRouter()
    const user = useSelector((state: any) => state.auth.userInfo);
    //@ts-ignore
    const [fromValue, setFromValue] = useState(null);
    //@ts-ignore
    const [toValue, setToValue] = useState(null);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const {data, loading, error} = useSubscription(GET_ATTENDANCES_ALL,{
        variables:{
            company_id: user?.employee?.company_id,
            froms: fromValue,
            to: toValue,
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            _ilike: `%${search}%`,
        }
    })

    const {data: dataAgg, loading: loadAgg, error: errAgg} = useSubscription(GET_ATTENDANCES_ALL_AGG,{
        variables:{
            company_id: user?.employee?.company_id,
            froms: fromValue,
            to: toValue,
            _ilike: `%${search}%`,
        }
    })
    

    useEffect(() =>{
        console.log(fromValue)
        console.log("Datas", data)
        if (loading){
            console.log("Loading...")
        }
        if (error){
            console.log("Error...", error)
        }
    }, [toValue, data, fromValue])

    return ( <>
        <main className={"flex flex-col min-w-full min-h-full"}>
            <Group gap={5}>
                <ActionIcon onClick={() =>router.back()} color="#404040" variant="subtle" aria-label="Settings">
                    <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
                <p style={{ fontWeight:  800, fontSize: "large", color: "#404040"}}> View All Attendance </p>
            </Group>
            <Paper p="md" mt="lg" radius="md" >
                <div className="flex flex-col md:flex-row items-center w-full justify-between">
                <TextInput
                    value={search}
                    leftSectionPointerEvents="none"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} />}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                />
                    <Group>
                        <DateInput

                            value={fromValue}
                            //@ts-ignore
                            onChange={setFromValue}
                            label="From"
                            placeholder="Date input"
                            mb={15}
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
                        <DateInput
                            value={toValue}
                            //@ts-ignore
                            onChange={setToValue}
                            label="To"
                            placeholder="Date input"
                            mb={15}
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
                    </Group>
                </div>
               {
                loading || error ?
                <FullWidthSkeletonStack /> :
                <ViewAttendanceTable 
                    datas = {data?.get_attenance_monthly_all_employee}
                />}
                <div className="justify-between items-center w-full">
                {
              errAgg || loadAgg ? null :
              <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
              Displaying { data?.get_attenance_monthly_all_employee?.length ? data?.get_attenance_monthly_all_employee?.length*activePage : 0} of {dataAgg?.get_attenance_monthly_all_employee?.length} attendaces.
            </p>}
                {
                errAgg || loadAgg ? null :
                <Group>
                    <NumberInput value={itemsPerPage} min={10} max={100} 
                          //@ts-ignore
                          onChange={setItemsPerPage} />
                    <FootPage 
                    activePage={activePage}
                    onPage={(v: any) => setPage(v)}
                    total={Math.ceil(dataAgg?.get_attenance_monthly_all_employee.length/itemsPerPage)}
                    />
                </Group>
            }
                </div>

            </Paper>
        </main>


    </> );
}

export default Page;