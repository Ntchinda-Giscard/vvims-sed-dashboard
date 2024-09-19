"use client"

import { Button, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import ServiceTable from "./components/serviceTable";
import FootPage from "../components/fotter";
import { useSubscription } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { GET_AGG_SERV, GET_SERVICES } from "./queries/get_services";
import AddserviceModal from "./components/addServiceModal";
import { deleteService } from "./slices/deleteServSlice";
import DeleteServModal from "./components/deleteServModal";
import FullWidthSkeletonStack from "../components/defaultTable";

function Services() {
    const [addServOpened, { open: openAddService, close: closeAddService }] = useDisclosure(false);
    const [deleOpended, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataServ, loading: loadServ, error: errServ} = useSubscription(GET_SERVICES,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,  // Pagination logic
        }
    })

    const {loading: loadAgg, error: errAgg, data: dataAgg} = useSubscription(GET_AGG_SERV,{
        variables:{
        company_id: user?.employee?.company_id,
        }
    
    })
    

    function handelEdit(values: any){
        console.log(values)
        // dispatch(editDepartment(values))
        openEdit()
    }
    function handleDelete(values: any){
        console.log(values)
        dispatch(deleteService(values))
        openDelete()
    }
    return ( <>
    <main className="flex flex-col min-w-full min-h-full"> 
        <AddserviceModal 
            opened={addServOpened}
            close={closeAddService}
        />
        <DeleteServModal
            opened={deleOpended}
            close={closeDelete}
        />
        <div className="flex flex-row w-full items-center justify-between">
            <h2 style={{ color: "#404044" }}> Services </h2>
            <Button
                onClick={openAddService}
                bg={"#16DBCC"} 
                leftSection={<IconPlus size={14} />}
                >
                Add Deparment
            </Button>
        </div>
        

        <Paper mt="md" p={15} radius="md" shadow="md">
            {
                loadServ || errServ ? <FullWidthSkeletonStack /> :
                <ServiceTable 
                datas={dataServ?.services}
                onEdit={(v: any) =>handelEdit(v)}
                onDelete={(v: any) => handleDelete(v)}
            />}
            <FootPage 
                activePage={activePage}
                onPage={(v: any) => setPage(v)}
                total={Math.ceil(dataAgg?.services_aggregate?.aggregate?.count/itemsPerPage)}
            />
        </Paper>
    </main>
    </> );
}

export default Services;
