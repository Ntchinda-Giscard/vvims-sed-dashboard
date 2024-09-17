"use client"
import { Button, Paper } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { Poppins } from "next/font/google";
import PositionTable from "./components/positionTable";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_POSITIONS, GET_POS_AGG } from "./queries/get_positoins";
import { useEffect, useState } from "react";
import FootPage from "../components/fotter";
import { useDisclosure } from "@mantine/hooks";
import AddPosModal from "./components/addPosModal";
import EditPosModal from "./components/editModal";
import DeletePos from "./components/deletePosModal";
import { editPosition } from "./slices/editSlice";
import { deletePosition } from "./slices/deleteSlice";



const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });


function Position() {
    //@ts-ignore
    const user = useSelector((state) => state.auth.userInfo);
    const dispatch = useDispatch()
    const [addPoseOpened, { open: openAddPos, close: closeAddpos }] = useDisclosure(false);
    const [deleteOpended, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [activePage, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const { loading: loadPos, error: errPos, data: dataPos } = useSubscription(GET_POSITIONS,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: activePage*itemsPerPage
        }
    });

    const {loading: loadAgg, error: errAgg, data: dataAgg} = useSubscription(GET_POS_AGG,{
        variables:{
            company_id: user?.employee?.company_id,
        }
    });

    useEffect(() =>{
        console.log(dataPos?.positions)
    },[dataPos])

    // if (errAgg) {
    //     console.log(errAgg)
    //      return `Error AGG: ${errAgg}` 
    // }
    // if (errPos) {
    //     console.log(errPos)
    //      return `Error AGG: ${errPos}` 
    // }

    function handelEdit(values: any){
        console.log(values)
        dispatch(editPosition(values))
        openEdit()
    }
    function handleDelete(values: any){
        console.log(values)
        dispatch(deletePosition(values))
        openDelete()
    }

    return ( 
    <main className="flex min-h-full min-w-full flex-col">
        <div className="flex flex-row justify-between items-center w-full">
        <h2 style={{ color: "#404044" }}>Positions</h2>
            <AddPosModal
                close={closeAddpos}
                opened={addPoseOpened}
            />
            <EditPosModal
                close={closeEdit}
                opened={editOpened} 
            />
            <DeletePos
                close={closeDelete}
                opened={deleteOpended} 
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
            <PositionTable 
                datas={dataPos?.positions}
                //@ts-ignore
                onEdit={(v) =>handelEdit(v)}
                //@ts-ignore
                onDelete={(v) => handleDelete(v)}
            />
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