import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select, TextInput, Group, Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useForm } from '@mantine/form';
import { useMutation, useQuery } from '@apollo/client';
import { GET_AGENCY_WOUT_DEPT } from '../queries/get_agency_without_dept';
import { GET_ALL_DEPT } from '../queries/get_dept';
import { useEffect, useState } from 'react';
import { INSERT_DEPT } from '../mutation/insert_dept';
import toast from 'react-hot-toast';
import { UPDATE_DEPT_PK } from '../mutation/edit_dept';
import { GET_SUPERVISORS } from '../queries/get_supervisors';


interface addDept{
    opened: boolean
    close: () => void
}
export default function EditDepartment({ opened, close }: addDept) {
    const user = useSelector((state: any) => state.auth.userInfo);
    const dept = useSelector((state: any) => state.editDept.editDept)
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

    // const {data: dataEmployee, loading: loadEmployee, error: errEmployee} = useQuery(GET_SUPERVISOR,{
    //     variables:{
    //       company_id: user?.employee?.company_id
    //     }
    //   })

    const [updateDept, {data, error, loading, reset}] = useMutation(UPDATE_DEPT_PK);
    const [pressSub, setPressSub] = useState(false);

    const[dataArr, setDataArr] = useState([]);
    const[dataDeptArr, setDeptDataArr] = useState([]);
    const [dataEmplArr, setEmplArr] = useState([])

    const form = useForm({
      mode: 'uncontrolled',
      initialValues: {
        name: '',
        agency: null,
        department: null,
        abrev_code: '',
        chief_of_dept: null

      },
  
      validate: {
        name: (value) => ( value.length > 2 ? null : 'Name should be atleast 3 character long'),
        abrev_code: (value) => ( value.length > 1 ? null : 'Abreviation should be atleast 3 character long'),
      },
    });

    useEffect(() =>{
        form.setFieldValue('name', dept?.text_content?.content)
        form.setValues({
            abrev_code: dept?.abrev_code,
            agency: dept?.agency
        })
        form.setValues
        console.log("Values", dept)
      console.log("Data agency",dataAgen)
      const agencyOption = dataAgen?.agencies?.map((a: { id: any; text_content: { content: any; }; }) =>({
        value: a?.id,
        label: a?.text_content?.content
      }))
      const deptOptions = dataDept?.departments?.map((d: { id: any; text_content: { content: any; }; }) =>({
          value: d?.id,
          label: d?.text_content?.content
      }))

    //   const employeeOptions = dataEmployee?.employees?.map((d: {
    //       lastname: any;
    //       firstname: any; id: any; text_content: { content: any; }; }) =>({
    //     value: d?.id,
    //     label: `${d?.firstname}` + " " + `${d?.lastname}`
    // }))
      setDataArr(agencyOption)
      setDeptDataArr(deptOptions)
    //   setEmplArr(employeeOptions)
    },[dataAgen, dataDept, dept])


    function handleSubmit(values: any){
      console.log(values)
      setPressSub(true)
      updateDept({
        variables:{
            id: dept?.id,
            abrev_code: values?.abrev_code,
            agency_id: values?.agency,
            parent_department_id: values?.department,
            chief_department: values?.chief_of_dept,
            name: dept?.text_content?.id,
            content: values?.name
        },
        onCompleted: () =>{
            close()
            toast.success("Update succesful")
        },
        onError: (err) =>{
            close()
            toast.error(`${err?.message}`)
        }
      })
    //   insertDept({
    //     variables:{
    //       company_id: user?.employee?.company_id,
    //       agency_id: values?.agency,
    //       parent_department_id: values?.department,
    //       abrev_code: values?.abrev_code,
    //       content: values?.name
    //     },
    //     onCompleted: () =>{
    //       setPressSub(false)
    //       close()
    //       toast.success("Operation sucessful")
    //     },
    //     onError: (err) =>{
    //       setPressSub(false)
    //       close()
    //       toast.error(`${err?.message}`)
    //     }
    //   })
    }
    
  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit departments">
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
          <Group grow>
            <TextInput
              withAsterisk
              label="Name"
              placeholder="Departement"
              key={form.key('name')}
              {...form.getInputProps('name')}
              styles={{
                label:{
                    color: "#404040"
                }
              }}
            />

            <TextInput
              withAsterisk
              label="Abbreviation"
              placeholder="DAF"
              key={form.key('abrev_code')}
              {...form.getInputProps('abrev_code')}
              styles={{
                label:{
                    color: "#404040"
                }
              }}
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
              styles={{
                label:{
                    color: "#404040"
                }
              }}
              
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
              styles={{
                label:{
                    color: "#404040"
                }
              }}
            />
            <Select 
              label="Chief of Dept."
              searchable
              clearable
              nothingFoundMessage="Nothing founed"
              key={form.key('chief_of_dept')}
              {...form.getInputProps('chief_of_dept')}
              //@ts-ignore
              disabled={loadEmployee || errEmployee}
              data={dataEmplArr}
              styles={{
                label:{
                    color: "#404040"
                }
              }}
            />
          </Stack>
      <Group justify="flex-end" mt="md" grow>
        <Button type="submit" loading={loading} color="#16DBCC" >Submit</Button>
        <Button onClick={close} color="red"   radius="md">Cancel</Button>
      </Group>
    </form>
      </Modal>

      
    </>
  );
}

