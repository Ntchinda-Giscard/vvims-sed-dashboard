import {Button, Paper} from "@mantine/core"
import StatsGrid from "@/app/dashboard/attendance/components/topCards";

function Page(){
    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <div className={"flex flex-row justify-between mb-8"}>
                    <p style={{fontWeight: 800, fontSize: "large"}}> Company Settings </p>
                    <Button bg={"#16DBCC"}>
                        View All Attendance
                    </Button>
                </div>
                <StatsGrid />
                <div className={"flex flex-row"}>
                    <div className={"flex w-2/3"}>

                    </div>
                    <div className={"flex w-1/3"}>

                    </div>

                </div>
                <Paper shadow="md" radius="md" p="md">

                </Paper>
            </main>
        </>
    )
}

export default Page