"use client"
import { useMutation } from '@apollo/client';
import { Modal, Button, Group } from '@mantine/core';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { DELETE_SERVICE } from '../mutation/delete_service';
import { Poppins } from 'next/font/google';


const poppins_medium = Poppins({ subsets: ["latin"], weight:["500"] });

interface delServ{
    opened: boolean
    close: () => void
}
function DeleteServModal({opened, close}:delServ) {
    const [deleteService, {data, loading, error, reset}] = useMutation(DELETE_SERVICE);
    const delServ = useSelector((state: any) => state.delServ.delServ);

    function handleDelete(){
        deleteService({
            variables:{
                id: delServ?.id
            },
            onCompleted: () =>{
                close()
                toast.success("Opearation sucessful")
            },
            onError: (err) =>{
                reset()
                toast.error(`${err.message}`)
            }
        })
    }
    return ( <>
        <Modal opened={opened} onClose={close} title="Delete service">
        <p className={poppins_medium.className}
        style={{
          fontSize: 'medium'
      }}
        >
          Do you really want to delete this service? This action cannot be undone.
        </p>
        <Group grow mt={"md"}>
            <Button onClick={close} color="#16DBCC"  radius="md">Cancel</Button>
            <Button onClick={handleDelete} loading={loading} color="red"  radius="md">Delete</Button>  
        </Group>
        </Modal>
    </> );
}

export default DeleteServModal;