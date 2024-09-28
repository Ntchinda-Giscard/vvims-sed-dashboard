"use client"
import { Button, Group, Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import VisitorTable from "./components/visitorTable";
import AddVisitor from "./components/addVisitorModal";
import { GET_VISITS, GET_VISITS_AGG } from "./query/get_visits";
import { useSubscription } from "@apollo/client";
import { useEffect, useState } from "react";
import FullWidthSkeletonStack from "../components/defaultTable";
import { Poppins } from 'next/font/google';
import FootPage from "../components/fotter";

const poppins = Poppins({ subsets: ["latin"], weight:["400"] });


function Page() {
    const [addOpenedVisitor, { open: openVisitor, close: closeVisitor }] = useDisclosure(false);
    const [activePage, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [date, setDate] = useState('2100-01-01')
//   const user = useSelector((state: any) => state.auth.userInfo);
  const [search, setSearch] = useState('');
    const {data: dataVisits, loading: loadVisits, error: errVisits} = useSubscription(GET_VISITS,{
        variables:{
            limit: itemsPerPage,
            offset: (activePage-1) * itemsPerPage,
            search: `%${search}%`,
            date: date
        }
    });
    const {data: dataAgg, error: errAgg, loading: loadAgg} = useSubscription(GET_VISITS_AGG,{
        variables:{
            search: `%${search}%`,
            date: date
        }
    })

    useEffect(() =>{
        console.log(dataVisits)
    }, [dataVisits])

    if (errVisits) return `Error: ${errVisits}`
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
            {
                loadVisits || errVisits ?
                <FullWidthSkeletonStack /> :
                <VisitorTable 
                datas={dataVisits?.visits}
            />}
            <Group justify="space-between" mt="md">
            {
              errAgg || loadAgg ? null :
              <p className={poppins.className} style={{color: "#007FFF", fontSize: "small"}}>
              Displaying { dataVisits?.visits?.length ? dataVisits?.visits?.length*activePage : 0} of {dataAgg?.visits_aggregate?.aggregate?.count} visits.
            </p>}
          {
            errAgg || loadAgg ? null :
            <FootPage 
              activePage={activePage}
              onPage={(v: any) => setPage(v)}
              total={Math.ceil(dataAgg?.visits_aggregate?.aggregate?.count/itemsPerPage)}
            />
          }
          </Group>
        </Paper>
    </main>
    </> );
}

export default Page;