"use client"
import { useMutation } from "@apollo/client";
import { Button, Divider, Group, MultiSelect, NumberInput, Paper, TextInput, rem } from "@mantine/core";
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconClock } from "@tabler/icons-react";
import { INSERT_COMPANY_SETTINGS } from "../mutation/insert_company_settings";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


function CompanySchedule() {
    // This would be your API call to fetch the company's schedule settings
    const user = useSelector((state: any) => state.auth.userInfo);
    const [insertSettings, {data, loading, error}] = useMutation(INSERT_COMPANY_SETTINGS)
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
          working_days: [],
          max_leave_days_per_year: null,
          number_of_leave_days: null,
          max_late_time: 45,
          start_work_time: "",
          end_work_time: ''
        },
    
        validate: {
          working_days: (value) => (value.length < 1? "Chose working days" : null),
          start_work_time: (value) => (value.length < 5 ? "Pick time at which work starts": null),
          end_work_time: (value) => (value.length < 5 ? "Pick time at which work ends": null),
          max_late_time: (value) => (value < 5 ? "Pick time at which employee is considered late": null),
          
        },
      });
    
      const day_of_week = [
                {"Monday": 1},
                {"Tuesday" :2,},
                {"Wednesday" :3},
                {"Thursday":4},
                {"Friday" :5},
                {"Saturday": 6},
                {"Sunday": 7}
            ]
    function mapDaysToNumbers(inputDays: any[], dayMapping: any[]) {
        return inputDays.map(day => {
            const mappedDay = dayMapping.find(mapping => mapping[day] !== undefined);
            return mappedDay ? mappedDay[day] : null;
        });
    }
        const handleSubmit = (values: any)=>{
            const toastId = toast.loading("In progress...")
            console.log(values)
            insertSettings({
                variables:{
                    company_id: user?.employee?.company_id,
                    end_work_time: values?.end_work_time,
                    max_late_time: `${values?.max_late_time*60}`,
                    max_leave_days_per_year: values?.max_leave_days_per_year,
                    number_of_leave_days: values?.number_of_leave_days,
                    start_work_time: values?.start_work_time,
                    working_days: mapDaysToNumbers(values?.working_days, day_of_week)
                },
                onCompleted: () =>{
                    toast.dismiss(toastId)
                    toast.success("Operation successful")
                },
                onError: (err) =>{
                    toast.dismiss(toastId)
                    toast.error("Operation failed")
                }
            })
        }

    return ( <>

        <Paper p="md" radius="md" shadow="md" mt="lg">
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
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
                        },
                        option:{
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
                        key={form.key('start_work_time')}
                        {...form.getInputProps('start_work_time')}
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
                    <NumberInput
                        label="Max late time(min)"
                        withAsterisk
                        styles={{
                            label:{
                                color: "#404040"
                            }
                        }}
                        defaultValue={45}
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
                <Button w={300}
                        bg={"#16DBCC"}
                        loading={loading}
                        type="submit">Submit</Button>
            </Group>
        </form>
        </Paper>
    </> );
}

export default CompanySchedule;