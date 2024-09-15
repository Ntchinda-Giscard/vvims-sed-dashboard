"use client"
import { Poppins } from "next/font/google";
import cx from 'clsx'
import { Button, Paper } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import AddAgencyModal from "./components/addAgencyModal";
import AgencyTable from "./components/agencyTable";
import { useDispatch, useSelector } from "react-redux";
import { editAgency } from "./slices/editAgencySlice";
import { deleteAgency } from "./slices/deleteAgencySlice";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_AGENCY } from "./query/getAgency";
import { useEffect, useState } from "react";
import FootPage from "../components/fotter";
import DeleteAgencyModal from "./components/deleteAgemcyModal";
import { AGENCY_AGG } from "./query/getAggAgency";


const poppins = Poppins({ subsets: ["latin"], weight:["500"] });

function Agency(){
    const user = useSelector((state: any) => state.auth.userInfo);
    const [addAgencyOpened, { open: openAgency, close: closeAgency }] = useDisclosure(false);
    const [deleAgencyOpened, { open: openDeleAgency, close: closeDeleteAgency }] = useDisclosure(false);
    const [editAgencyOpened, { open: openEditAgency, close: closeEditAgency }] = useDisclosure(false);
    const [activePage, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const {data: dataAgency, error: errAgency, loading: loadAegncy} = useSubscription(GET_AGENCY,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: activePage*itemsPerPage,
        }
    })
    const {data: dataAgg, error: errAgg, loading: laodAgg} = useSubscription(AGENCY_AGG, {
        variables:{
            company_id: user?.employee?.company_id,
        }
    })
    const dispatch =  useDispatch();

    useEffect(() =>{
        console.log(dataAgg)
    },[dataAgg])

    function handleEdit(data:any){
        dispatch(editAgency(data))
        openEditAgency()
    }
    function handleDelete(data: any){
        dispatch(deleteAgency(data))
        openDeleAgency()
    }
    return(
        <main className="flex min-h-full flex-col gap-3">
            <AddAgencyModal
                close = {closeAgency}
                opened={addAgencyOpened}
            />
            <DeleteAgencyModal 
                close={closeDeleteAgency}
                opened={deleAgencyOpened}
            />
            <div className="flex flex-row w-full justify-between">
                <p>Agencies</p>

                <Button
                    onClick={openAgency}
                    bg={"#16DBCC"} 
                    leftSection={<IconPlus size={14} />}
                >
                    Add Agency
                </Button>

            </div>
            <Paper shadow="md" radius={"md"} p={15} >
                <AgencyTable 
                    onEdit = {(v:any) =>handleEdit(v)}
                    onDelete = {(v:any) =>handleDelete(v)}
                    datas={dataAgency?.agencies}
                />
                <FootPage 
                    activePage={activePage + 1}
                    onPage={(v: any) => setPage(v)}
                    total={Math.ceil(dataAgg?.agencies_aggregate?.aggregate?.count/itemsPerPage)}
                />
            </Paper>
            
            
        </main>
    )
}

export default Agency;