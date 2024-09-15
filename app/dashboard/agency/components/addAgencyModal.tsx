"use client"
import { useMutation } from '@apollo/client';
import { Modal, Button, TextInput, Group, Stack, Textarea } from '@mantine/core';
import {useForm} from '@mantine/form';
import { INSERT_AGENCY } from '../mutation/insert_agency';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import {toast} from "react-hot-toast"

interface addAgency{
    opened: boolean,
    close: () => void
}
export default function AddAgencyModal({opened, close}: addAgency) {

  const [insertAgency, {data, loading, error, reset}] = useMutation(INSERT_AGENCY);
  const user = useSelector((state: any) => state.auth.userInfo);
  const [pressSub, setPressSub] = useState(false)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: "",
      city: "",
      region: "",
      office: "",
      address: "",
      neighborhood: "",
      phone_number: "",
      po_box: "",
    },
    validate:{
      name: (value) => (value.length < 3? "Name should 3 characters minimum" : null),
      city: (value) => (value.length < 3? "City should 3 characters minimum" : null),
      region: (value) => (value.length < 3? "Region should 3 characters minimum" : null),
      office: (value) => (value.length < 3? "Office should 3 characters minimum" : null),
      address: (value) => (value.length < 3? "Address should 3 characters minimum" : null),
      neighborhood: (value) => (value.length < 3? "Neighborhood should 3 characters minimum" : null),
      phone_number: (value) => (/^6[0-9]{8}$/.test(value)? null : 'Invalid phone number'),
      po_box: (value) => (value.length < 3 ? "PO Box number should be 3 characters minimum": null),
    }
  })


  function handleInsertAgency(values: any){
    console.log(values)
    setPressSub(true)
    insertAgency({
      variables:{
        address: values?.address,
        city: values?.city,
        company_id: user?.employee?.company_id,
        name: values?.name,
        office: values?.office,
        phone_number: values?.phone_number,
        po_box: values?.po_box,
        region: values?.region,
        neighborhood: values?.neighborhood
      },
      onCompleted: () =>{
        setPressSub(false)
        close()
        toast.success('Operation succesfull')

      },
      onError: (err) =>{
        setPressSub(false)
        close()
        toast.error(`${err?.message}`)
      }
    })

  }

  function handleCancel(){
    close();
    if(pressSub){
        reset();
    }
  }



  return (
    <>
      <Modal opened={opened} onClose={close} title="Add Agency" size="xl">
        {/* Modal content */}
        <form onSubmit={form.onSubmit((values) => handleInsertAgency(values))}>
          <Group grow>
          <TextInput 
            withAsterisk
            label="Name"
            placeholder="Agency Name"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
           <TextInput 
            withAsterisk
            label="City"
            placeholder="Douala"
            key={form.key('city')}
            {...form.getInputProps('city')}
          />
          </Group>

          <Group grow>
          <TextInput 
            withAsterisk
            label="Region"
            placeholder="Littoral"
            key={form.key('region')}
            {...form.getInputProps('region')}
          />
           <TextInput 
            withAsterisk
            label="Office"
            placeholder="Bonanjo"
            key={form.key('office')}
            {...form.getInputProps('office')}
          />
          </Group>


          <Group grow>
          <TextInput 
            withAsterisk
            label="Phone number"
            placeholder="6xxxxxxxx"
            key={form.key('phone_number')}
            {...form.getInputProps('phone_number')}
          />
           <TextInput 
            withAsterisk
            label="PO Box"
            placeholder="6080"
            key={form.key('po_box')}
            {...form.getInputProps('po_box')}
          />
          </Group>

          <Stack>
          <TextInput 
            withAsterisk
            label="Neighborhood"
            placeholder="Palace"
            key={form.key('neighborhood')}
            {...form.getInputProps('neighborhood')}
          />
            <Textarea 
              withAsterisk
              label="Address"
              placeholder="D55 Bonanjo Round-about, Opposite Independence Way, Ketu, Ibadan."
              key={form.key('address')}
              {...form.getInputProps('address')}
            />
          </Stack>
          <Group grow justify="flex-end" mt="md">
            <Button loading={loading} type="submit" color={"#16DBCC"} >Submit</Button>
            <Button onClick={handleCancel} color="red"> Cancel </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}