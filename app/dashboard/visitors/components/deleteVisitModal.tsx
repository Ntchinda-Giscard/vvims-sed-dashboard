"use client"
import { useMutation } from '@apollo/client';
import { Modal, Button, Group } from '@mantine/core';
import { DELETE_VISITS } from '../mutation/delete_visits';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export default function DeleteVisitorModal({data, opened, close}: any) {
    const [deleteVisitor, {loading}] = useMutation(DELETE_VISITS)

    useEffect(() =>{
        console.log(data)
    }, [data])
    const handleDelete= () =>{
        deleteVisitor({
            variables:{
                id: data?.id
            },
            onCompleted: () =>{
                toast.success("Visit deleted")
                close()
            },
            onError: (err) =>{
                toast.error(`${err.message}`)
            }
        })
    }
  return (
    <>
      <Modal opened={opened} onClose={close} title={<p style={{color: "#404040"}}>Delete visit</p>}>
        {/* Modal content */}
        <p style={{ fontWeight: 600, color: "#404040"}}> Do you really want ot delete this visit? </p>
        <Group grow mt={15}>
            <Button color={"#16DBCC"}  onClick={close}> Cancel </Button>
            <Button loading={loading} onClick={handleDelete} color="red"> Delete </Button>
        </Group>
      </Modal>

    </>
  );
}