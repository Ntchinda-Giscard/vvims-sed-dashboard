import { useMutation } from '@apollo/client';
import { Modal, Button, Group } from '@mantine/core';
import { useSelector } from 'react-redux';
import { DELELTE_POS } from '../mutation/deletePos';
import { Poppins } from 'next/font/google';
import { useState } from 'react';

interface addPos{
    opened: boolean
    close: () => void
}

const poppins_medium = Poppins({ subsets: ["latin"], weight:["500"] });

export default function DeletePos({opened,close }: addPos) {
    const deletePos = useSelector((state: any) => state.deletePos.deletePos);
    const user = useSelector((state: any) => state.auth.userInfo);
    const [pressSub, setPressSub] = useState(false)
    
    const [deletePosition, { data, loading, error, reset }] = useMutation(DELELTE_POS);

    function handleDelete(){
        try{
            setPressSub(true)
            deletePosition({
                variables:{
                    company_id: user?.employee?.company_id,
                    id: deletePos?.id
                },
                onCompleted: () =>{
                    setPressSub(false)
                    close();
                }
            })
        }catch{
            setPressSub(false)
        }
    }

    function handleCancel(){
        close();
        if(pressSub){
            reset();
        }
        
    }
  

  return (
    <>
      <Modal opened={opened} onClose={close} title={ <p style={{color: "#404040"}}>Delete Position</p> } >
        <p className={poppins_medium.className} style={{
            fontSize: 'large'
        }} >
            <p style={{ color: "#404040", fontSize: "medium" }}> Do you really want to delete thsi position ?! </p>
        </p>
        <Group grow>
            <Button onClick={handleCancel} color="#16DBCC"  radius="md">Cancel</Button>
            <Button onClick={handleDelete} loading={loading} color="red"  radius="md">Delete</Button>  
        </Group>
      </Modal>

    </>
  );
}