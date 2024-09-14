"use client"
import { useMutation } from '@apollo/client';
import { Modal, Button, TextInput, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';

interface addPos{
    opened: boolean
    close: () => void
}

export default function EditPosModal({opened, close}: any) {
    // const [insertPosition, { data, loading, error }] = useMutation(INSERT_POS);
    const user = useSelector((state: any) => state.auth.userInfo);
    const editPos = useSelector((state: any) => state.editPos.editPos);

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          level: 1,
        },
    
        validate: {
          name: (value) => (value.length < 0 ? 'Invalid name' : null),
          level: (value) => (value < 0) ? "Invalid position" : null,
        },
      });
    
    function handleInsertPos(values: any){
        try{
            
        }catch{

        }
        
    }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit position">
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleInsertPos(values))}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Directeur General"
        defaultValue={editPos?.text_content?.content}
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <NumberInput
        label="Level"
        min={1}
        clampBehavior="strict"
        defaultValue={editPos?.level}
        key={form.key('level')}
        {...form.getInputProps('level')}
        mt="md"
    />


      <Group justify="flex-end" mt="md" grow>
        {/* <Button loading={loading} type="submit" color="#16DBCC"  radius="md">Submit</Button>
        <Button 
        //@ts-ignore
            disabled={loading || error} onClick={close} color="red"  radius="md">Close</Button> */}
      </Group>
    </form>


      </Modal>

    </>
  );
}