"use client"
import { Button, Divider, Group, MultiSelect, NumberInput, Paper, rem } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconClock } from "@tabler/icons-react";


function CompanySchedule() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          working_days: [],
          max_leave_days_per_year: 0,
          number_of_leave_days: 0,
          max_late_time: '',
          start_work_time: '',
          end_work_time: ''
        },
    
        validate: {
          working_days: (value) => (value.length < 1? "Chose working days" : null),
          start_work_time: (value) => (value.length < 5 ? "Pick time at which work starts": null),
          end_work_time: (value) => (value.length < 5 ? "Pick time at which work ends": null),
          
        },
      });

    return ( <>

        <Paper p="md" radius="md" shadow="md" mt="lg">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <p style={{fontWeight: 500, fontSize: "medium", color: "#386BF6"}}> Working Days and Hours </p>
            <Divider mt={10} mb={18} />
                <MultiSelect
                    label="What days do you prefer your employees to work?"
                    withAsterisk
                    placeholder="Pick days"
                    data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
                    hidePickedOptions
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                    key={form.key('working_days')}
                    {...form.getInputProps('working_days')}
                />
                <Group justify="center" grow mb="lg" mt="md">
                    <TimeInput
                        label="Work starts"
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                        key={form.key('max_late_time')}
                        {...form.getInputProps('max_late_time')}
                    />
                    <TimeInput
                        label="Work ends"
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                        key={form.key('end_work_time')}
                        {...form.getInputProps('end_work_time')}
                    />
                    <TimeInput
                        label="Max late time"
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                        key={form.key('max_late_time')}
                        {...form.getInputProps('max_late_time')}
                    />
                </Group>

            <p style={{fontWeight: 500, fontSize: "medium", color: "#386BF6"}}> Leaves</p>
            <Divider mt={10} mb={18} />
            <Group grow mt="md">
                <NumberInput
                    label="Number of leaves provided to employees yearly?"
                    placeholder="Input placeholder"
                    min={1}
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                    key={form.key('max_leave_days_per_year')}
                    {...form.getInputProps('max_leave_days_per_year')}
                />
                <NumberInput
                    label="Maximum number of consecutive days "
                    placeholder="Input placeholder"
                    min={1}
                    styles={{
                        label:{
                            color: "#404040"
                        }
                    }}
                    key={form.key('number_of_leave_days')}
                    {...form.getInputProps('number_of_leave_days')}
                />
                </Group>
            <Group justify="center" mt="md">
                <Button w={300} type="submit">Submit</Button>
            </Group>
        </form>
        </Paper>
    </> );
}

export default CompanySchedule;