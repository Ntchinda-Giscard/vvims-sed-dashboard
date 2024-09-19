"use client"
import { Button, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddDeptModal from "./components/AddDeptModal";
import DeparmentTable from "./components/DepartmentTable";
import { useMutation, useSubscription } from "@apollo/client";
import { GET_DEPT, GET_DEPT_AGG } from "./queries/get_dept";
import FootPage from "../components/fotter";
import DeleteDeptModal from "./components/deleteDeptModal";
import { deleteDeparment } from "./slices/delDepSlice";
import { editDepartment } from "./slices/editDeptSlice";
import EditDepartment from "./components/editDeparmentModal";
import EditDepartmentModal from "./components/editDepartmentModal";
import FullWidthSkeletonStack from "../components/defaultTable";
import { ACTIVATE_DEPT } from "./mutation/activate_dept";
import { DEACTIVTE_DEPT } from "./mutation/deactivate_dept";
import toast from "react-hot-toast";


function Departments(){
    const user = useSelector((state: any) => state.auth.userInfo);
    const dispatch = useDispatch();
    const [addDepatOpened, { open: openAddDept, close: closeAddDept }] = useDisclosure(false);
    const [deleteDeptOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
    const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
    const [activePage, setPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const {data: dataDept, loading: loadDept, error: errDept} = useSubscription(GET_DEPT,{
        variables:{
            company_id: user?.employee?.company_id,
            limit: itemsPerPage,
            offset: activePage * itemsPerPage,  // Pagination logic
        }
    });

    const {loading: loadAgg, error: errAgg, data: dataAgg} = useSubscription(GET_DEPT_AGG,{
        variables:{
        company_id: user?.employee?.company_id,
        }
    })
    const [activateDept, {data: dataActivateDept}]  = useMutation(ACTIVATE_DEPT)
    const [deactivate, {data: dataDeactivateDept}]  = useMutation(DEACTIVTE_DEPT)
    
    function handelEdit(values: any){
        console.log(values)
        dispatch(editDepartment(values))
        openEdit()
    }
    function handleDelete(values: any){
        console.log(values)
        dispatch(deleteDeparment(values))
        openDelete()
    }

    function handleDeactivate(values: any){
        const toasId  = toast.loading("Operation progress...")
        activateDept({
            variables:{
                id: values?.id,
            },
            onCompleted: () =>{
                toast.dismiss(toasId)
                toast.success("Operation succesful")
            },
            onError: (error) =>{
                toast.error("Operation failed")
            }
        })
    }

    function handleActivate(values: any){
        const toasId = toast.loading("Operation progress...")
        deactivate({
            variables:{
                id: values?.id,
            },
            onCompleted: () =>{
                toast.dismiss(toasId)
                toast.success("Operation succesful")
            },
            onError: (error) =>{
                toast.error("Operation failed")
            }
        })
    }

    useEffect(() =>{
        console.log("Dept", dataDept)
    }, [dataDept])

    return(
        <>
        <main className="flex flex-col min-w-full min-h-full">  
            <div>
                <AddDeptModal 
                opened={addDepatOpened}
                close={closeAddDept}
            />
            <DeleteDeptModal
                opened={deleteDeptOpened}
                close={closeDelete}
            />
            <EditDepartmentModal 
                opened={editOpened}
                close={closeEdit}
            />
            </div>
            
            <div className="flex flex-row justify-between">
                <p style={{color: "#404040"}}> Deparments </p>
                <Button
                    onClick={openAddDept}
                    bg={"#16DBCC"} 
                    leftSection={<IconPlus size={14} />}
                    >
                    Add Department
                </Button>
            </div>
            <Paper mt="md" p={15} radius="md" shadow="md">
                {
                    loadDept || errDept ? <FullWidthSkeletonStack /> :
                    <DeparmentTable 
                        datas={dataDept?.departments}
                        onEdit={(v: any) =>handelEdit(v)}
                        onDelete={(v: any) => handleDelete(v)}
                        onDeactivate = {(v: any) => handleDeactivate(v)  }
                        onActivate = {(v: any) => handleActivate(v)  }
                    />
                }
                {
                    loadAgg || errAgg ? null :
                    <FootPage 
                    activePage={activePage + 1}
                    onPage={(v: any) => setPage(v)}
                    total={Math.ceil(dataAgg?.departments_aggregate?.aggregate?.count/itemsPerPage)}
                />}
            </Paper>
        </main>
        </>
    )
}

export default Departments;