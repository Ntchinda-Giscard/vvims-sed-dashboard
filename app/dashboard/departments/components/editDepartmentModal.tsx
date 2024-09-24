"use client"
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Select, Group, TextInput } from '@mantine/core';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { GET_AGENCY_WOUT_DEPT } from '../queries/get_agency_without_dept';
import { GET_ALL_DEPT } from '../queries/get_dept';
import { GET_SUPERVISORS } from '@/app/dashboard/departments/queries/get_supervisors';
import { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { UPDATE_DEPT_PK } from '../mutation/edit_dept';
import toast from 'react-hot-toast';


export default function EditDepartmentModal({opened, close}: any) {
    const user = useSelector((state: any) => state.auth.userInfo);
    const dept = useSelector((state: any) => state.editDept.editDept);

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

    const {data: dataEmployee, loading: loadEmployee, error: errEmployee} = useSubscription(GET_SUPERVISORS,{
        variables:{
          company_id: user?.employee?.company_id
        }
      })
    const [updateDepartment, {data: dataUpdate, loading: loadUpdate, error: errUpdate}] = useMutation(UPDATE_DEPT_PK)
    
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

    const [dataArr, setDataArr] = useState([]);
    const [dataDeptArr, setDeptDataArr] = useState([]);
    const [dataEmplArr, setEmplArr] = useState([])
    
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

      const employeeOptions = dataEmployee?.employees?.map((d: {
          lastname: any;
          firstname: any; id: any; text_content: { content: any; }; }) =>({
        value: d?.id,
        label: `${d?.firstname}` + " " + `${d?.lastname}`
    }))
      setDataArr(agencyOption)
      setDeptDataArr(deptOptions)
      setEmplArr(employeeOptions)
    },[dataAgen, dataDept, dept])

    const handleSubmit = (values: any) =>{
        updateDepartment({
          variables:{
            abrev_code: values?.abrev_code,
            id: dept?.id,
            agency_id: values?.agency,
            chief_department: values?.chief_of_dept,
            parent_department_id: values?.department,
            name: dept?.text_content?.id,
            content: values?.name
          },
          onCompleted: () =>{
            close()
            toast.success("Operation successful")
          },
          onError: (err) =>{
            toast.error(`${err.message}`)
          }
        })
    }


  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit deparment">
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
                    color: "#404040",
                    fontSize: "small"
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
                    color: "#404040",
                    fontSize: "small"
                }
              }}
            />
        </Group>
        <Select 
          label="Chief of Dept."
          mt="md"
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
                color: "#404040",
                fontSize: "small"
            },
            option:{
              color: "#404040"
            }
          }}
        />
        <Select 
          label="Supervising Dept."
          searchable
          clearable
          mt="md"
          nothingFoundMessage="Nothing founed"
          key={form.key('department')}
          {...form.getInputProps('department')}
          //@ts-ignore
          disabled={loadDept || errDept}
          data={dataDeptArr}
          styles={{
            label:{
              color: "#404040",
              fontSize: "small"
            },
            option:{
              color: "#404040"
            }
          }}
        />
         <Group justify="flex-end" mt="md" grow>
          <Button type="submit" 
          loading={loadUpdate} 
          color="#16DBCC" >Submit</Button>
          <Button onClick={close} color="red"   radius="md">Cancel</Button>
        </Group>
        </form>
        
      </Modal>
    </>
  );
}
