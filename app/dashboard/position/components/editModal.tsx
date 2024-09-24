"use client"
import { useMutation } from '@apollo/client';
import { Modal, Button, TextInput, Group, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useSelector } from 'react-redux';
import { UPDATE_POS } from '../mutation/update_position';
import { useEffect, useState } from 'react';

interface addPos{
    opened: boolean
    close: () => void
}

export default function EditPosModal({opened, close}: any) {
    const [updatePosition, { data, loading, error,reset }] = useMutation(UPDATE_POS);
    const user = useSelector((state: any) => state.auth.userInfo);
    const editPos = useSelector((state: any) => state.editPos.editPos);
    const [pressSub, setPressSub] = useState(false);

    useEffect(() =>{
        console.log("editPos:", editPos)
    },[editPos])

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: editPos?.text_content?.content,
          level: editPos?.level,
        },
    
        validate: {
          name: (value) => (value.length < 0 ? 'Invalid name' : null),
          level: (value) => (value < 0) ? "Invalid position" : null,
        },
      });
    
      function handleDelete(values: any){
        try{
            setPressSub(true)
            updatePosition({
                variables:{
                    company_id: user?.employee?.company_id,
                    id: editPos?.id,
                    level: values?.level,
                    text_id: editPos?.text_content?.id,
                    content: values?.name
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
      <Modal opened={opened} onClose={close} title= {<p style={{color: "#404040"}}> {"Edit position"} </p> } >
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleDelete(values))}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Directeur General"
        defaultValue={editPos?.text_content?.content}
        key={form.key('name')}
        {...form.getInputProps('name')}
        styles = {{
          label:{
            color: "#404040"
          },
        }}
      />
      <NumberInput
        label="Level"
        min={1}
        clampBehavior="strict"
        defaultValue={editPos?.level}
        key={form.key('level')}
        {...form.getInputProps('level')}
        mt="md"
        styles = {{
          label:{
            color: "#404040"
          },
        }}
    />


      <Group justify="flex-end" mt="md" grow>
      <Button loading={loading} type="submit" color="#16DBCC"  radius="md">Submit</Button>
      <Button onClick={handleCancel} color="red"  radius="md">Close</Button>
    </Group>
    </form>


      </Modal>

    </>
  );
}