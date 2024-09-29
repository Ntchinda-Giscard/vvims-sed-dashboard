"use client"
import { IconArrowLeft, IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { ActionIcon, Group, Paper, Badge, Text, Image, Card, Stack, Divider, Button } from "@mantine/core";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Pages() {
    const router = useRouter();
    const visitor = useSelector((state: any) => state.visitor.visitor);
    const dateConverter=(date: any) =>{
        if(date  === null) return '--:--:--'
        const new_date = new Date(date).toLocaleTimeString('en-GB', {hour12: false})
        return new_date
      }
    useEffect(() =>{
        console.log("Visitor", visitor)
    },[visitor])
    return ( <>
    <main className="flex flex-col min-w-full min-h-full">
        <Group mb="xl">
            <ActionIcon onClick={() =>router.back()} color="#404040" variant="subtle" aria-label="Settings">
                <IconArrowLeft style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Visitor details </p>
        </Group>
        <div className="flex md:flex-row gap-5 flex-col">
            <Card withBorder>
                <Card.Section>
                    <Image
                        // radius="md"
                        src={visitor?.visitorByVisitor?.file?.file_url                        }
                        h={200}
                        fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                    />
                </Card.Section>
                <div className="flex flex-row justify-between items-center">
                    <p style={{color:'black', fontSize: 'xsmall', textTransform: "uppercase"}}> status </p>

                <Badge mt="xs" variant="light" color={visitor?.visit_status?.status === 'PENDING' ? 'blue' : (visitor?.visit_status?.status === 'ACCEPTED' ? 'teal' : 'red')}>
          {visitor?.visit_status?.status}</Badge>
                </div>
            <div className="flex flex-row justify-between " >
                <p style={{fontWeight: 700, fontSize: 'medium', color: "black", textTransform: "capitalize"}}>
                    {visitor?.visitorByVisitor?.firstname + " " +visitor?.visitorByVisitor?.lastname}
                </p>
                <Stack gap={3}>
                    <Text size="sm" c='dimmed'> {`Clock in: ${dateConverter(visitor?.check_in_at)}`} </Text>
                    <Text size="sm" c='dimmed'> {`Clock out: ${dateConverter(visitor?.check_out_at)}`} </Text>
                </Stack>
            </div>
            <div className="flex flex-col mt-9" >
                <div className="flex flex-row justify-between " >
                    <Text c='black'> Phone </Text>
                    <Text c='dimmed'> {visitor?.visitorByVisitor?.phone_number} </Text>
                </div>
                <Divider mt={2} mb={15} />
                <div className="flex flex-row justify-between " >
                    <Text c='black'> Id Number </Text>
                    <Text c='dimmed'> {visitor?.visitorByVisitor?.id_number} </Text>
                </div>
                <Divider mt={2} mb={5} />
                <div className="flex flex-row justify-between " >
                    <Text c='black'> Reg No. </Text>
                    <Text c='dimmed'> {visitor?.reg_no} </Text>
                </div>
                <Divider mt={2} mb={5} />
            </div>
            <Button disabled bg={"#16DBCC"} fullWidth mt="md" radius="md">
                Print Card
            </Button>
            </Card>
            <div className="flex flex-col">
                <Paper withBorder p="md" >
                    <div className="flex flex-col md:flex-row gap-5">
                        <div className="flex flex-col">
                            <p style={{color: "#404040", fontSize: 'medium', textTransform: "capitalize", fontWeight: 500}}> Front</p>
                            <Image
                                radius="md"
                                src={visitor?.visitorByVisitor?.file?.visitorsByFrontId?.file?.file_url                        }
                                h={200}
                                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            />

                        </div>
                        <div className="flex flex-col">
                            <p style={{color: "#404040", fontSize: 'medium', textTransform: "capitalize", fontWeight: 500}}> Back</p>
                            <Image
                                radius="md"
                                src={visitor?.visitorByVisitor?.file?.visitorsByBackId?.file?.file_url                      }
                                h={200}
                                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                            />

                        </div>
                    </div> 
                </Paper>
                <Paper></Paper>
            </div>
        </div>
    </main>
    
    </> );
}

export default Pages;