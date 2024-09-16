"use client"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, TextInput, Select, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_DEPT } from '../../departments/queries/get_dept';
import { INSERT_SERVICE } from '../mutation/add_service';
import toast from 'react-hot-toast';

interface addServ{
    opened: boolean
    close: () => void
}
export default function AddserviceModal({opened, close}: addServ) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          name: '',
          department: '',
        },
    
        validate: {
          name: (value) => ( value.length > 2 ? null : 'Service name should be 3 characters long'),
          department: (value) => ( value.length > 2 ? null : 'Chose a deparment'),
        },
      });
    const user = useSelector((state: any) => state.auth.userInfo);
    
    const {data: dataDept, loading: loadDept, error: errDept} = useQuery(GET_ALL_DEPT,{
    variables:{
        company_id: user?.employee?.company_id
    }
    });

    const [dataArray, setDataDept] = useState([]);
    const [insertService, {data, error, loading, reset}] = useMutation(INSERT_SERVICE);

    useEffect(() =>{
        const deptOptions = dataDept?.departments?.map((d: { id: any; text_content: { content: any; }; }) =>({
            value: d?.id,
            label: d?.text_content?.content
        }))
        setDataDept(deptOptions)
    },[dataDept])
    function handleSubmit(values: any){
        insertService({
            variables:{
                company_id: user?.employee?.company_id,
                department_id: values?.department,
                content: values?.name
            },
            onCompleted: () =>{
                close()
                toast.success("Operation sucessful")
            },
            onError: (err) =>{
                console.log(err)
                toast.error("An error occurred")
            }
        })
    }
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add  Service">
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
                <Select
                    label="Departments"
                    placeholder="Pick value"
                    data={dataArray}
                    key={form.key('department')}
                    {...form.getInputProps('department')}
                    nothingFoundMessage="Nothing founed"
                    clearable
                    searchable
                />
                <TextInput
                    withAsterisk
                    label="Name"
                    placeholder="service comptable"
                    key={form.key('name')}
                    {...form.getInputProps('name')}
                />
            </Stack>
            

            <Group justify="flex-end" mt="md" grow>
        <Button type="submit" loading={loading} radius="md" color="#16DBCC" >Submit</Button>
        <Button onClick={close} color="red"   radius="md" >Cancel</Button>
      </Group>
        </form>

      </Modal>
    </>
  );
}