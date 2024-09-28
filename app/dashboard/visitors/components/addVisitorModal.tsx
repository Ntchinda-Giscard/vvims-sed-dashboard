"use client"
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { Modal, Button, TextInput, Group, Stack, Select, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { GET_SERV_BY_DEPT_ID } from '../../add-employee/query/get_services';
import { GET_ALL_DEPT } from '../../departments/queries/get_dept';
import { GET_EMPLY } from '../../add-employee/query/get_all_empl';
import { GET_ALL_VISITORS } from '../query/get_all_visitors';
import { GET_ALL_SERVICES } from '../query/get_all_services';
import { GET_ALL_VEHICLES } from '../query/get_all_verhicles';
import { INSERT_VISITS, INSERT_VISITS_VISITOR } from '../mutation/insert_visits';
import toast from 'react-hot-toast';

export default function AddVisitor({opened, close}: any) {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          firstname: null,
          lastname: null,
          id_card_number: null,
          service: null,
          department: null,
          employee: null,
          phone_number: null,
          visitors: null,
          reason: null,
          vehicle: null
        },
    
        validate: {
            // firstname: (value) => ( value.length < 3 ? "Firtname must be 3 character at least" : null),
            // lastname: (value) => ( value.length < 3 ? "Lastname must be 3 character at least" : null),
            // id_card_number: (value) => ( value.length < 5 ? "Lastname must be 3 character at least" : null),
            // phone_number: (value) => (/^6[0-9]{8}$/.test(value)? null : 'Invalid phone number'),
        },
      });
        const user = useSelector((state: any) => state.auth.userInfo);
        const {data: dataVehicle, error: errVehicle, loading: loadVehicle} = useQuery(GET_ALL_VEHICLES)
        const {data: dataVisitor, error: errVisitor, loading: loadVisitor} = useSubscription(GET_ALL_VISITORS, {
            variables:{
                company_id: user?.employee?.company_id,
            }
        })
        const {data: dataService, error: errService, loading: loadService } = useQuery(GET_ALL_SERVICES,{
            variables:{
            company_id: user?.employee?.company_id,
        }}
        );

        const {data: dataDept, loading: loadDept, error: errDept} = useQuery(GET_ALL_DEPT,{
        variables:{
        company_id: user?.employee?.company_id
        }
        });
        const {data: dataAllEmpl, loading: loadAll, error: errAll} = useSubscription(GET_EMPLY,{
        variables:{
            company_id: user?.employee?.company_id
        }
        })
        const [deptArr, setDept] = useState([]);
        const [servArr, setServ] = useState([]);
        const [allArr, setAll] = useState([]);
        const [arrVisitor, setAllVisitor] = useState([])
        const [arrVehicle, setArrVehicle] = useState([])

        useEffect(() =>{
            const deptOptions = dataDept?.departments?.map((d: { id: any; text_content: { content: any; }; }) =>({
                value: d?.id,
                label: d?.text_content?.content
            }))
            const servOptions = dataService?.services?.map((d: { id: any; text_content: { content: any; }; }) =>({
                value: d?.id,
                label: d?.text_content?.content
            }))
            const allOptions = dataAllEmpl?.employees?.map((d: { id: any; firstname: any, lastname:any }) =>({
                value: d?.id,
                label: `${d?.firstname}` + " "+ `${d?.lastname}`,
            }))
            const visitorOption = dataVisitor?.visitors?.map((d: {
                id_number: any;
                phone_number: any; id: any; firstname: any, lastname:any 
}) =>({
                value: d?.id,
                label: `${d?.firstname}` + " "+ `${d?.lastname}`,
                phone_number: d?.phone_number,
                id_card_no: d?.id_number
            }))
            const vehicleOption = dataVehicle?.vehicles?.map((d: any) =>({
                value: d?.id,
                label: d?.license
            }))
            setDept(deptOptions)
            setServ(servOptions)
            setAll(allOptions)
            setAllVisitor(visitorOption)
            setArrVehicle(vehicleOption)
        }, [dataDept, dataService, dataAllEmpl, dataVisitor, dataVehicle])
    
    const [insertVisitWithVisitor, {data: dataVisitWVisitor, loading: loadVWV, error: errVWV}] = useMutation(INSERT_VISITS_VISITOR)
    const [insertVisit, {data: dataVisit, loading: loadVisit, error: errVisit}] = useMutation(INSERT_VISITS)

    function handleSubmit(values: any){
        console.log(values)
        
        if(!form.getValues().department && !form.getValues().employee && !form.getValues().service){
            toast.error("Chose either a department, a service or an employee")
            return
        }
        if(form.getValues().visitors){
            console.log("visitor selected")
            insertVisit({
                variables:{
                    reason: values.reason,
                    vehicle: values.vehicle,
                    host_service: values.service,
                    host_employee: values.employee,
                    host_department: values.department,
                    visitor: values.visitors
                },
                onCompleted: () =>{
                    toast.success("Visit inserted successfully")
                    form.reset()
                    close()
                },
                onError: (err) =>{
                    toast.error(`${err.message}`)
                }
            })
        }
        else{
            console.log(" no visitor selected")
            insertVisitWithVisitor({
                variables:{
                    company_id: user?.employee?.company_id,
                    reason: values.reason,
                    vehicle: values.vehicle,
                    host_service: values.service,
                    host_employee: values.employee,
                    host_department: values.department,
                    id_number: values.id_card_number,
                    lastname: values.lastname,
                    phone_number: values.phone_number,
                    firstname: values.firstname,
                },
                onCompleted: () =>{
                    toast.success("Visit inserted successfully")
                    form.reset()
                    close()
                },
                onError: (err) =>{
                    toast.error(`Verify that you entered the vistors info if you did not chose a previous visitor`)
                }
            })
        }
    }


  return (
    <>
      <Modal opened={opened} size="lg" onClose={close} title= {<p style={{color: "#404040"}}> Add Visitor </p>}>
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack gap={5} >
                <Select
                    label={"Visitor"}
                    placeholder="Pick visitor"
                    data={arrVisitor}
                    clearable
                    searchable
                    allowDeselect
                    key={form.key('visitors')}
                    {...form.getInputProps('visitors')}
                    nothingFoundMessage="Nothing found..."
                    styles={{
                        label:{
                            color: "#404040"
                        },
                        option:{
                            color: "#404040"
                        }
                    }}
                />
                <Group grow>
                    <TextInput
                        withAsterisk
                        label="Firstname"
                        placeholder="firstname"
                        key={form.key('firstname')}
                        {...form.getInputProps('firstname')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        withAsterisk
                        label="Lastname"
                        placeholder="lastname"
                        key={form.key('lastname')}
                        {...form.getInputProps('lastname')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>
                <Group grow>
                    <TextInput
                        withAsterisk
                        label="Id card number"
                        placeholder="..."
                        key={form.key('id_card_number')}
                        {...form.getInputProps('id_card_number')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        withAsterisk
                        label="Phone number"
                        placeholder="6xxxxxx"
                        key={form.key('phone_number')}
                        {...form.getInputProps('phone_number')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>
                <Textarea
                    size="md"
                    label="Reason"
                    placeholder=" reason..."
                    key={form.key('reason')}
                    {...form.getInputProps('reason')}
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                />
                <Select
                    label={"Department"}
                    placeholder="Pick department"
                    data={deptArr}
                    clearable
                    searchable
                    allowDeselect
                    key={form.key('department')}
                    {...form.getInputProps('department')}
                    nothingFoundMessage="Nothing found..."
                    styles={{
                        label:{
                            color: "#404040"
                        },
                        option:{
                            color: "#404040"
                        }
                    }}
                />
                    <Select
                        label={ "Service"}
                        placeholder="Pick service"
                        allowDeselect
                    //@ts-ignore
                        // disabled={errService || loadService}
                        data={servArr}
                        clearable
                        searchable
                        key={form.key('service')}
                        {...form.getInputProps('service')}
                        nothingFoundMessage="Nothing found..."
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />
                    <Select
                        label={"Employee"}
                        placeholder="Pick employee"
                        data={allArr}
                        clearable
                        searchable
                        key={form.key('employee')}
                        {...form.getInputProps('employee')}
                        nothingFoundMessage="Nothing found..."
                        styles={{
                            label:{
                                color: "#404040"
                            },
                            option:{
                                color: "#404040"
                            }
                        }}
                    />

                <Select
                    label={"Vehicles"}
                    placeholder="Pick vehicle"
                    data={arrVehicle}
                    clearable
                    searchable
                    allowDeselect
                    key={form.key('vehicle')}
                    {...form.getInputProps('vehicle')}
                    nothingFoundMessage="Nothing found..."
                    styles={{
                        label:{
                            color: "#404040"
                        },
                        option:{
                            color: "#404040"
                        }
                    }}
                />
                
            </Stack>
            


        <Group justify="flex-end" mt="md" grow>
            <Button bg={"#16DBCC"} loading={loadVWV || loadVisit}  type="submit">Submit</Button>
            <Button bg={"red"} onClick={close} >Cancel</Button>
        </Group>
        </form>
      </Modal>


    </>
  );
}