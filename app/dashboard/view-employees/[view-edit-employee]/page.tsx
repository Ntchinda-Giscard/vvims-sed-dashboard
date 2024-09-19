"use client"
import { ActionIcon, Avatar, Box, Button, Divider, Group, Paper, PasswordInput, Select, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {useRouter} from 'next/navigation';
import { IconArrowLeft } from "@tabler/icons-react";

export default function Page({ params }: { params: { slug: string } }) {
  const employeeToEdit = useSelector((state: any) => state.editEmpl.editEmpl);
  const router = useRouter()
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      firstname: "",
      lastname: "",
      region: "",
      address: "",
      phone_number: "",
      service: null,
      department: null,
      functions: "",
      supervisor_id: null,
      license: "",
      password: "",
      position: null,
      role: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      firstname: (value) => (value.length < 2? "First name should be 2 characters minimum" : null),
      lastname: (value) => (value.length < 2? "Last name should be 2 characters minimum" : null),
      region: (value) => (value.length < 3? "Region should be 2 characters minimum" : null),
      address: (value) => (value.length < 3? "Address should be 2 characters minimum" : null),
      phone_number: (value) => (/^6[0-9]{8}$/.test(value)? null : 'Invalid phone number'),
      service: (value) => (value === null? "Select service" : null),
      department: (value) => (value === null? "Select department" : null),
      position: (value) => (value === null? "Select position" : null),
      functions: (value) => (value.length < 2? "Fonction should be 2 characters minimum" : null),
    //   supervisor_id: (value) => (value.length < 5? "ID number should be 5 characters minimum" : null),
      license: (value) => (value.length < 2? "License should be 2 characters minimum" : null),
      password: (value) => (value.length < 6? "Password should be 6 characters minimum" : null),
      role: (value) => (value.length < 1? "Select role" : null),
    },
  });

  useEffect(() =>{
    form.setFieldValue('firstname', employeeToEdit?.firstname)
    console.log('email', employeeToEdit)
  }, [employeeToEdit])
    return (
    <>
      <main className="flex min-h-full flex-col gap-3">
        <Group mt={25}>
        <ActionIcon onClick={() => router.back()} variant="transparent" color="black" aria-label="Settings">
                <IconArrowLeft style={{ width: '70%', height: '70%' }}  stroke={1.5} />
                </ActionIcon>
                <h3 style={{color: "#404040"}}> Employee Details </h3>
        </Group>
        

    <Box pos="relative" w="100%">
      <Group justify="center">
        <Avatar variant='filled' my="lg" radius={100} size={300} src="" />
      </Group>
        <Paper shadow="md" radius="md" p="md">
        <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
            <h3 style={{color: "#386BF6", marginTop: 25}}> Personal Details </h3>
            <Divider my={5} />
            <Stack gap="md" mt="md" mb="xs">
                <Group justify='space-between' grow gap="md">
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
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>

                <Group justify="space-between" grow gap="md">
                    <TextInput
                        withAsterisk
                        label="Region"
                        placeholder="littoral"
                        key={form.key('region')}
                        {...form.getInputProps('region')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        withAsterisk
                        label="Address"
                        placeholder="address"
                        key={form.key('address')}
                        {...form.getInputProps('address')}
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        label="Phone number"
                        placeholder="6xxxxxxxx"
                        key={form.key('phone_number')}
                        {...form.getInputProps('phone_number')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>
            </Stack>

            <h3 style={{color: "#386BF6", marginTop: 25}}> Company Profile </h3>
            <Divider my={5} />
            {/* <Stack gap="md" mt="md" mb="xs">
                <Group justify="space-between" grow gap="md">
                    <Select
                        label={"Department"}
                        placeholder="Pick department"
                        // data={deptArr}
                        clearable
                        searchable
                        allowDeselect
                        key={form.key('department')}
                        {...form.getInputProps('department')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <Select
                        label={ "Service"}
                        placeholder="Pick service"
                        allowDeselect
                    //@ts-ignore
                        disabled={errService || loadService}
                        // data={servArr}
                        clearable
                        searchable
                        key={form.key('service')}
                        {...form.getInputProps('service')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        label= {"Function"}
                        placeholder="function"
                        key={form.key('functions')}
                        {...form.getInputProps('functions')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>

                <Group justify="space-between" grow gap="md">
                    <Select
                        label={ "Position" }
                        placeholder="Pick position"
                        // data={posArr}
                        clearable
                        searchable
                        key={form.key('position')}
                        {...form.getInputProps('position')}
                        nothingFoundMessage="Nothing found..."
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <TextInput
                        label={"License"}
                        placeholder="license"
                        key={form.key('license')}
                        {...form.getInputProps('license')}
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                    <Select
                        label={"Supervisor"}
                        placeholder="Pick supervisor"
                        // data={allArr}
                        clearable
                        searchable
                        key={form.key('supervisor_id')}
                        {...form.getInputProps('supervisor_id')}
                        nothingFoundMessage="Nothing found..."
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                    />
                </Group>
            </Stack> */}

            <h3 style={{color: "#386BF6", marginTop: 25}}> Account Details </h3>
            <Divider my={5} />
            {/* <Group justify="space-between" grow gap="md" mt="md">
                <PasswordInput
                    label={"Password"}
                    placeholder="******"
                    key={form.key('password')}
                    {...form.getInputProps('password')}
                    withAsterisk
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                />
                <Select
                    label={"Role"}
                    placeholder="Pick role"
                    data={['EMPLOYEE', 'ADMIN']}
                    key={form.key('role')}
                    {...form.getInputProps('role')}
                    withAsterisk
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                />
            </Group> */}
            <Group justify="center" mt="xl" >
                <Button type="submit" 
                // loading={loading} 
                color={"#16DBCC"}>Add Employee</Button>
            </Group>
        </form>
    </Paper>
    </Box>
   
    </main>
    </>
    )
  }