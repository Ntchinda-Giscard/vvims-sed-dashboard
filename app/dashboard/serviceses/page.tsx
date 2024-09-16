"use client"

import { Button, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import ServiceTable from "./components/serviceTable";
import FootPage from "../components/fotter";
import { useSubscription } from "@apollo/client";
import { useSelector } from "react-redux";
import { GET_AGG_SERV, GET_SERVICES } from "./queries/get_services";
import AddserviceModal from "./components/addServiceModal";
import { deleteService } from "./slices/deleteServSlice";

function Services() {
    const [addServOpened, { open: openAddService, close: closeAddService }] = useDisclosure(false);
    const [deleOpended, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [activePage, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataServ, loading: loadServ, error: errServ} = useSubscription(GET_SERVICES,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: activePage * itemsPerPage,  // Pagination logic
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
        <div className="flex flex-row w-full items-center justify-between">
            <p> Deparments </p>
            <Button
                onClick={openAddService}
                bg={"#16DBCC"} 
                leftSection={<IconPlus size={14} />}
                >
                Add Deparment
            </Button>
        </div>
        

        <Paper mt="md" p={15} radius="md" shadow="md">
            <ServiceTable 
                datas={dataServ?.services}
                onEdit={(v: any) =>handelEdit(v)}
                onDelete={(v: any) => handleDelete(v)}
            />
            <FootPage 
                activePage={activePage + 1}
                onPage={(v: any) => setPage(v)}
                total={Math.ceil(dataAgg?.services_aggregate?.aggregate?.count/itemsPerPage)}
            />
        </Paper>
    </main>
    </> );
}

export default Services;

function dispatch(arg0: { payload: any; type: "delServ/deleteService"; }) {
    throw new Error("Function not implemented.");
}
