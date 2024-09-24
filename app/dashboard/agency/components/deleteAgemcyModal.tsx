import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { useMutation } from '@apollo/client';
import { DELETE_AGENCY } from '../mutation/deleteAgency';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Poppins } from 'next/font/google';

interface deletAgency{
    opened: boolean,
    close: () => void
}

const poppins_medium = Poppins({ subsets: ["latin"], weight:["500"] });

export default function DeleteAgencyModal({opened, close}: deletAgency) {
    const [deleteAgency, {loading, data, error, reset}] = useMutation(DELETE_AGENCY);
    const [pressSub, setPressSub] = useState(false);
    const deleteAgen = useSelector((state: any) => state.deleteAgen.deleteAgen);

    function handleDelete(){
        try{
            setPressSub(true)
            deleteAgency({
                variables:{
                    id: deleteAgen?.id
                },
                onCompleted: () =>{
                    setPressSub(false)
                    close()
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
      <Modal opened={opened} onClose={close} title= {<p style={{ color: "#404040" }} > {"Delete agency"} </p>  } >
        {/* Modal content */}
        <p className={poppins_medium.className} style={{
            fontSize: 'medium'
        }}>
            Do you really want to delete this agency? This action cannot be undone.
        </p>

        <Group grow mt={"md"}>
            <Button onClick={handleCancel} color="#16DBCC"  radius="md">Cancel</Button>
            <Button onClick={handleDelete} loading={loading} color="red"  radius="md">Delete</Button>  
        </Group>
      </Modal>
    </>
  );
}