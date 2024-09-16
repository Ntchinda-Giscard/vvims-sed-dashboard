"use client"
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box, Paper, TextInput, Divider, Stack, Select, MultiSelect } from '@mantine/core';
import { useForm } from '@mantine/form';
function AddEmployee() {
    const [visible, { toggle }] = useDisclosure(false);
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          email: '',
          firstname: "",
          lastname: "",
          date_of_birth: "",
          region: "",
          address: "",
          phone_number: "",
          agency: null,
          department: null,
          service: null,
          function: "",
          id_card_number: "",
          license: "",
          password: "",
          position: null,
          role: null,
        },
    
        validate: {
          email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          firstname: (value) => (value.length < 2? "First name should be 2 characters minimum" : null),
          lastname: (value) => (value.length < 2? "Last name should be 2 characters minimum" : null),
          date_of_birth: (value) => (value.length < 10? "Invalid date of birth" : null),
          region: (value) => (value.length < 3? "Region should be 2 characters minimum" : null),
          address: (value) => (value.length < 3? "Address should be 2 characters minimum" : null),
          phone_number: (value) => (/^6[0-9]{8}$/.test(value)? null : 'Invalid phone number'),
          service: (value) => (value === null? "Select service" : null),
          department: (value) => (value === null? "Select department" : null),
          position: (value) => (value === null? "Select position" : null),
          function: (value) => (value.length < 2? "Fonction should be 2 characters minimum" : null),
          id_card_number: (value) => (value.length < 5? "ID number should be 5 characters minimum" : null),
          license: (value) => (value.length < 2? "License should be 2 characters minimum" : null),
          password: (value) => (value.length < 6? "Password should be 6 characters minimum" : null),
          role: (value) => (value === null? "Select role" : null),
        },
      });
    return ( <>
    <main className="flex min-h-full flex-col gap-3">
    Add employees

    <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {/* ...other content */}
    </Box>
    <Paper shadow="md" radius="md" p="md">
        <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
            <h3 style={{color: "#386BF6"}}> Personal Details </h3>
            <Divider my={5} />
            <Stack gap="md" mt="md" mb="xs">
                <Group justify='space-between' grow gap="md">
                    <TextInput
                        withAsterisk
                        label="Firstname"
                        placeholder="firstname"
                        key={form.key('firstname')}
                        {...form.getInputProps('firstname')}
                    />
                    <TextInput
                        withAsterisk
                        label="Lastname"
                        placeholder="lastname"
                        key={form.key('lastname')}
                        {...form.getInputProps('lastname')}
                    />
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                </Group>

                <Group justify="space-between" grow gap="md">
                    <TextInput
                        withAsterisk
                        label="Region"
                        placeholder="littoral"
                        key={form.key('region')}
                        {...form.getInputProps('region')}
                    />
                    <TextInput
                        withAsterisk
                        label="Address"
                        placeholder="address"
                        key={form.key('address')}
                        {...form.getInputProps('address')}
                    />
                    <TextInput
                        withAsterisk
                        label="Phone number"
                        placeholder="6xxxxxxxx"
                        key={form.key('phone_number')}
                        {...form.getInputProps('phone_number')}
                    />
                </Group>
            </Stack>

            <h3 style={{color: "#386BF6"}}> Company Profile </h3>
            <Divider my={5} />
            <Stack gap="md" mt="md" mb="xs">
                <Group justify="space-between" grow gap="md">
                    <Select
                        label="Department"
                        placeholder="Pick department"
                        data={['7']}
                        withAsterisk
                        clearable
                        searchable
                        key={form.key('function')}
                        {...form.getInputProps('function')}
                        nothingFoundMessage="Nothing found..."

                    />
                    <Select
                        label="Service"
                        placeholder="Pick service"
                        data={['0']}
                        withAsterisk
                        clearable
                        searchable
                        key={form.key('function')}
                        {...form.getInputProps('function')}
                        nothingFoundMessage="Nothing found..."

                    />
                    <TextInput
                        withAsterisk
                        label="Function"
                        placeholder="function"
                        key={form.key('function')}
                        {...form.getInputProps('function')}

                    />
                </Group>

                <Group justify="space-between" grow gap="md">
                    <Select
                        label="Position"
                        placeholder="Pick position"
                        data={['p']}
                        withAsterisk
                        clearable
                        searchable
                        key={form.key('position')}
                        {...form.getInputProps('position')}
                        nothingFoundMessage="Nothing found..."

                    />
                    <TextInput
                        withAsterisk
                        label="License"
                        placeholder="license"
                        key={form.key('license')}
                        {...form.getInputProps('license')}

                    />
                </Group>
            </Stack>

            <h3 style={{color: "#386BF6"}}> Account Details </h3>
            <Divider my={5} />
            <Group justify="space-between" grow gap="md">
                <MultiSelect
                    label="Role"
                    placeholder="Pick role"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                />
            </Group>
            

            <Group justify="center" mt="md">
                <Button type="submit" color={"#16DBCC"}>Add Employee</Button>
            </Group>
        </form>
    </Paper>
    </main>
    </> );
}

export default AddEmployee;