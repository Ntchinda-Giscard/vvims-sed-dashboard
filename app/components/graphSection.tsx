"use client"
import { Paper, Group, Radio, SegmentedControl, Select } from "@mantine/core";
import { useState } from "react";
import { LineChart } from '@mantine/charts';
import classes from "@/app/components/css/dashboard.module.css"
import cx from "clsx"





function GraphSection() {
    const [value, setValue] = useState('vi');
    return ( <>

    <Paper withBorder pr={20} pb={15} w={"100%"}>
        <Group p={10} justify="space-between">
            <p className={cx([classes.titleCars])}> Entry Statistics </p>
            <Group>
                <SegmentedControl
                    value={value}
                    onChange={setValue}
                    data={[
                        { label: 'Visitors', value: 'vi' },
                        { label: 'Vehicles', value: 've' },
                    ]}
                />
                <Select
                    placeholder="Pick value"
                    data={['This month', 'Today', 'This week']}
                />
            </Group>
        </Group>
        <LineChart
            h={300}
            data={[
                {veh: 23, visitors: 6},
                {veh: 22, visitors: 64},
                {veh: 29, visitors: 62},
                {veh: 10, visitors: 1},
                {veh: 4, visitors: 5},
                {veh: 43, visitors: 4},
            ]}
            dataKey="veh"
            series={[
                { name: 'visitors', color: '#16DBCC' },
            ]}
            curveType="natural"
            withDots={false}
        />
    </Paper>
    
    </> );
}

export default GraphSection;