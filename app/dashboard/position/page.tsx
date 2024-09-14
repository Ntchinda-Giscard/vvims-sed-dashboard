"use client"
import { Button, Paper } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { Poppins } from "next/font/google";
import PositionTable from "./components/positionTable";
import { useSelector } from "react-redux";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_POSITIONS, GET_POS_AGG } from "./queries/get_positoins";
import { useEffect, useState } from "react";
import FootPage from "../components/fotter";
import { useDisclosure } from "@mantine/hooks";
import AddPosModal from "./components/addPosModal";



const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });


function Position() {
    //@ts-ignore
    const user = useSelector((state) => state.auth.userInfo);
    const [addPoseOpened, { open: openAddPos, close: closeAddpos }] = useDisclosure(false);
    const [activePage, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { loading: loadPos, error: errPos, data: dataPos } = useQuery(GET_POSITIONS,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: activePage*itemsPerPage
        }
    });

    const {loading: loadAgg, error: errAgg, data: dataAgg} = useQuery(GET_POS_AGG,{
        variables:{
            company_id: user?.employee?.company_id,
        }
    });

    useEffect(() =>{
        console.log(dataPos?.positions)
    },[dataPos])

    if (errAgg) {
        console.log(errAgg)
         return `Error AGG: ${errAgg}` 
    }
    if (errPos) {
        console.log(errPos)
         return `Error AGG: ${errPos}` 
    }

    return ( 
    <main className="flex min-h-full min-w-full flex-col">
        <div className="flex flex-row justify-between items-center w-full">
            <p>Positions</p>
            <AddPosModal
                close={closeAddpos}
                opened={addPoseOpened}
            />
            <Button
                onClick={openAddPos}
                bg={"#16DBCC"} 
                leftSection={<IconPlus size={14} />}
            >
                Add Position
            </Button>
            
        </div>
        <Paper shadow={"md"} p={15}>
            <PositionTable datas={dataPos?.positions} />
            <FootPage 
                activePage={activePage + 1}
                onPage={(v: any) => setPage(v)}
                total={Math.ceil(dataAgg?.positions_aggregate?.aggregate?.count/itemsPerPage)}
            />
        </Paper>
    </main> 
    );
}

export default Position;