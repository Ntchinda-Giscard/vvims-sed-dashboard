import {Button} from "@mantine/core"

function Page(){
    return(
        <>
            <main className={"flex flex-col min-w-full min-h-full"}>
                <div className={"flex flex-row justify-between"}>
                    <p style={{fontWeight: 800, fontSize: "large"}}> Company Settings </p>
                    <Button bg={"#16DBCC"}>
                        View All Attendance
                    </Button>
                </div>

            </main>
        </>
    )
}

export default Page