import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select, TextInput, Group, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AGENCY_WOUT_DEPT } from '../queries/get_agency_without_dept';
import { GET_ALL_DEPT } from '../queries/get_dept';
import { useEffect, useState } from 'react';
import { INSERT_DEPT } from '../mutation/insert_dept';


interface addDept{
    opened: boolean
    close: () => void
}
export default function AddDeptModal({ opened, close }: addDept) {
    const user = useSelector((state: any) => state.auth.userInfo);
    const {data: dataAgen, loading: loadAgency, error: errAgency} = useQuery(GET_AGENCY_WOUT_DEPT,{
      variables:{
        company_id: user?.employee?.company_id
      }
    })

    const {data: dataDept, loading: loadDept, error: errDept} = useQuery(GET_ALL_DEPT,{
      variables:{
        company_id: user?.employee?.company_id
      }
    })

    const[dataArr, setDataArr] = useState([]);
    const[dataDeptArr, setDeptDataArr] = useState([]);

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        name: '',
        agency: null,
        department: null,
        abrev_code: ''

      },
  
      validate: {
        name: (value) => ( value.length > 2 ? null : 'Name should be atleast 3 character long'),
        abrev_code: (value) => ( value.length > 1 ? null : 'Abreviation should be atleast 3 character long'),
      },
    });

    useEffect(() =>{
      console.log("Data agency",dataAgen)
      const agencyOption = dataAgen?.agencies?.map((a: { id: any; text_content: { content: any; }; }) =>({
            value: a?.id,
            label: a?.text_content?.content
          }))
      const deptOptions = dataDept?.departments?.map((d: { id: any; text_content: { content: any; }; }) =>({
          value: d?.id,
          label: d?.text_content?.content
      }))

      const [insertDept, {data, error, loading, reset}] = useMutation(INSERT_DEPT);
      const [pressSub, setPressSub] = useState(false);

      setDataArr(agencyOption)
      setDeptDataArr(deptOptions)
    },[dataAgen, dataDept])

    function handleCancel(){
      close();
      if(pressSub){
        reset();
    }
    }

    function handleSubmit(values: any){
      console.log(values)
      setPressSub(true)
      insertDept({
        variables:{
          company_id: user?.employee?.company_id,
          agency_id: values?.agency,
          parent_department_id: values?.department,
          abrev_code: values?.abrev_code,
          content: values?.name
        },
        onCompleted: () =>{
          setPressSub(false)
          close()
          toast.sucess("Operation sucessful")
        },
        onError: (err) =>{
          setPressSub(false)
          close()
          toast.error(`${err?.message}`)
        }
      })
    }
    
  return (
    <>
      <Modal opened={opened} onClose={close} title="Add departments">
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group grow>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Departement"
              key={form.key('name')}
              {...form.getInputProps('name')}
            />

            <TextInput
              withAsterisk
              label="Abbreviation"
              placeholder="DAF"
              key={form.key('abrev_code')}
              {...form.getInputProps('abrev_code')}
            />
          </Group>
          <Stack>
            <Select 
              label="Agency"
              searchable
              clearable
              nothingFoundMessage="Nothing founed"
              key={form.key('agency')}
              {...form.getInputProps('agency')}
              //@ts-ignore
              disabled={loadAgency || errAgency}
              data={dataArr}
            />
            <Select 
              label="Supervising Dept."
              searchable
              clearable
              nothingFoundMessage="Nothing founed"
              key={form.key('department')}
              {...form.getInputProps('department')}
              //@ts-ignore
              disabled={loadDept || errDept}
              data={dataDeptArr}
            />
          </Stack>
      <Group justify="flex-end" mt="md" grow>
        <Button type="submit" color="#16DBCC" >Submit</Button>
        <Button onClick={handleCancel} color="red"   radius="md">Cancel</Button>
      </Group>
    </form>
      </Modal>

      
    </>
  );
}
function useEfect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}

