"use client"
import { Button, Paper } from "@mantine/core";
import { IconPlus } from '@tabler/icons-react';
import { Poppins } from "next/font/google";
import PositionTable from "./components/positionTable";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import { GET_POSITIONS } from "./queries/get_positoins";
import { useEffect } from "react";



const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });


function Position() {
    //@ts-ignore
    const user = useSelector((state) => state.auth.userInfo);
    const { loading: loadPos, error: errPos, data: dataPos } = useQuery(GET_POSITIONS,{
        variables:{
            company_id: user?.employee?.company_id
        }
    });

    useEffect(() =>{
        console.log(dataPos?.positions)
    },[dataPos])

    return ( 
    <main className="flex min-h-full min-w-full flex-col">
        <div className="flex flex-row justify-between items-center w-full">
            <p>Positions</p>
            <Button
                bg={"#16DBCC"} 
                leftSection={<IconPlus size={14} />}
            >
                Add Position
            </Button>
            
        </div>
        <Paper shadow={"md"} p={15}>
            <PositionTable datas={dataPos?.positions} />
        </Paper>
    </main> 
    );
}

export default Position;