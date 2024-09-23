import { useSubscription } from "@apollo/client";
import {LineChart} from "@mantine/charts";
import { GET_ATT_MONTH } from "../queries/get_total_empl";
import { useEffect } from "react";


function AttendanceLineChart(){
    const {data, loading, error} = useSubscription(GET_ATT_MONTH)

    return(
        <>
        {
            loading || error ? <></> :
            <LineChart
            h={300}
            data={data?.get_attenance_monthly}
            dataKey="day"
            series={[
                { name: 'clock_in_count', color: '#16DBCC' },
            ]}
            curveType="natural"
            withDots={false}
        />
            }
        </>
    )
}

export default AttendanceLineChart;