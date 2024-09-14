import { useMutation } from '@apollo/client';
import { Modal, Button, Group } from '@mantine/core';
import { useSelector } from 'react-redux';
import { DELELTE_POS } from '../mutation/deletePos';

interface addPos{
    opened: boolean
    close: () => void
}

export default function DeletePos({opened,close }: addPos) {
    const deletePos = useSelector((state: any) => state.deletePos.deletePos);
    const user = useSelector((state: any) => state.auth.userInfo);
    
    const [deletePosition, { data, loading, error, reset }] = useMutation(DELELTE_POS);

    function handleDelete(){
        try{
            deletePosition({
                variables:{
                    company_id: user?.employee?.company_id,
                    id: deletePos?.id
                },
                onCompleted: () =>{
                    close();
                }
            })
        }catch{

        }
    }

    function handleCancel(){
        reset();
        close();
    }
  

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Position">
        Do you really want to delete thsi position ?!
        <Group grow>
            <Button onClick={handleCancel} color="#16DBCC"  radius="md">Cancel</Button>
            <Button onClick={handleDelete} loading={loading} color="red"  radius="md">Delete</Button>  
        </Group>
      </Modal>

    </>
  );
}