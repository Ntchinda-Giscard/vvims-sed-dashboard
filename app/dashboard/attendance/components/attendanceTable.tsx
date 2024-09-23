"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea, Badge,  } from '@mantine/core';
import { IconTrash, IconEdit, IconDotsVertical, IconEye, IconUserX, IconUserCheck } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function AttendanceTable({datas, onEdit, onDelete, onDeactivate}:any) {
  const [scrolled, setScrolled] = useState(false)
  const time_extract = (datetime: any) =>{
    if (datetime === null){
      return "--:--:--"
    }
    const date = new Date(datetime)

    const options = {timezone: 'Africa/Douala', hour12: false}
    const catTime = date.toLocaleTimeString('en-US', options)
    return catTime
  }
  const rows = datas?.map((data: {
    clock_out_time: ReactNode;
    clock_in_time: ReactNode;
    attendance_state: any;
    clock_in_date: ReactNode;
    employee: any;
    function: ReactNode;
      firstname: any;
      lastname: any; id: Key | null | undefined; region: any; department: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; service: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; position: {
        function: ReactNode; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; 
}; 
}) => (
    <Table.Tr key={data?.id}>
      <Table.Td style={{ color: "#404044" }} >{ `${data?.employee?.firstname}` + " "+ `${data?.employee?.lastname}`}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.employee?.department?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.employee?.service?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.clock_in_date}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{time_extract(data?.clock_in_time)}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>
        {
        data?.attendance_state ? <Badge variant='light' color='red' > Late </Badge> : <Badge variant='light' color='lime' >ON Time</Badge>}
      </Table.Td>
      <Table.Td style={{ color: "#404044" }}>{time_extract(data?.clock_out_time)}</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={300} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

    
    <Table withRowBorders miw={700}>
      <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Name </Table.Th>
          <Table.Th style={{ color: "#404044" }}>Department</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Service</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Date</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Clock in time</Table.Th>
          <Table.Th style={{ color: "#404044" }}></Table.Th>
          <Table.Th style={{ color: "#404044" }}>Clock out time</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
  );
}

