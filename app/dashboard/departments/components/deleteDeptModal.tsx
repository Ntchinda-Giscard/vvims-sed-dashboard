import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { DELETE_DEPT } from '../mutation/delete_dept';
import { Poppins } from 'next/font/google';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

interface delDept{
    opened: boolean
    close: () => void
}

const poppins_medium = Poppins({ subsets: ["latin"], weight:["500"] });

export default function DeleteDeptModal({opened, close}: delDept) {

  const [deleteDept, {data, loading, error, reset}] = useMutation(DELETE_DEPT);
  const delDept = useSelector((state: any) => state.delDept.delDept);
  const [pressSub, setPressSub] = useState(false);

  useEffect(() =>{
    console.log("Redux",delDept)
  },[])

  function handleDelete(){
    setPressSub(false)
    deleteDept({
      variables:{
        id: delDept?.id
      },
      onCompleted: ()=>{
        setPressSub(false)
        close()
        toast.success("Operation successful")
      },
      onError: (err)=>{
        setPressSub(false)
        close()
        toast.error(`${err?.message}`)
      }
    })
  }

  function handleCancel(){
    close();
    if(pressSub){
      reset();
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title= { <p style={{ color: "#404040" }}> {"Delete department"} </p>  } >
        {/* Modal content */}

        <p className={poppins_medium.className}
        style={{
          fontSize: 'medium', color: "#404040"
      }}
        >
          Do you really want to delete this department? This action cannot be undone.
        </p>
        <Group grow mt={"md"}>
            <Button onClick={handleCancel} color="#16DBCC"  radius="md">Cancel</Button>
            <Button onClick={handleDelete} loading={loading} color="red"  radius="md">Delete</Button>  
        </Group>
      </Modal>
    </>
  );
}
