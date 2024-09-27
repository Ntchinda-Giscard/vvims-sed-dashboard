"use client"
import { Button, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import VisitorTable from "./components/visitorTable";
import AddVisitor from "./components/addVisitorModal";


function Page() {
    const [addOpenedVisitor, { open: openVisitor, close: closeVisitor }] = useDisclosure(false);
    return ( <>
    <main className="flex flex-col min-h-full min-w-full">
        <AddVisitor 
            opened = {addOpenedVisitor}
            close={closeVisitor}
        />
        <div className="flex md:flex-row flex-col justify-between">
            <p style={{fontWeight: 800, fontSize: "large", color: "#404040"}}> Visitors </p>
            <Button
                onClick={openVisitor}
                bg={"#16DBCC"} 
                leftSection={<IconPlus size={14} />}
                >
                Add Visitor
            </Button>
        </div>
        <Paper radius="md" shadow="md" p="md" mt="lg" >
            <VisitorTable />
        </Paper>
    </main>
    </> );
}

export default Page;