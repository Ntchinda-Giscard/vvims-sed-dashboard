"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea,  } from '@mantine/core';
import { IconTrash, IconEdit, IconDotsVertical, IconEye, IconUserX, IconUserCheck } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function AppointmentTable({datas, onAccept, onDelete, onCanceled}:any) {
  const [scrolled, setScrolled] = useState(false)
  const rows = datas?.map((data: {
      date: ReactNode;
      start_time: ReactNode;
      end_time: ReactNode;
      status: ReactNode;
      employee: any;
      visitor: any;
    function: ReactNode;
      firstname: any;
      lastname: any; id: Key | null | undefined; region: any; department: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; service: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; position: {
        function: ReactNode; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; 
}; 
}) => (
    <Table.Tr key={data?.id}>
      <Table.Td style={{ color: "#404044", textTransform: "capitalize"}} >{ `${data?.employee?.firstname}` + " "+ `${data?.employee?.lastname}`}</Table.Td>
      <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>{ `${data?.visitor?.firstname}` + " "+ `${data?.visitor?.lastname}`}</Table.Td>
      <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>{data?.date}</Table.Td>
      <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>{data?.start_time}</Table.Td>
      <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>{data?.end_time}</Table.Td>
      <Table.Td style={{ color: "#404044", textTransform: "capitalize"}}>{data?.status}</Table.Td>
      <Table.Td>
        <Menu shadow="md">
            <Menu.Target>
            <ActionIcon variant="transparent" color="gray" aria-label="Settings">
                <IconDotsVertical style={{ width: '70%', height: '70%' }}  stroke={1.5} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item color="blue" onClick={() => onAccept(data)} leftSection={<IconUserCheck  style={{ width: rem(14), height: rem(14) }} /> }> View </Menu.Item>
              <Menu.Item color="orange" onClick={() => onCanceled(data)} leftSection={<IconUserX  style={{ width: rem(14), height: rem(14) }} />}> Deactivate </Menu.Item>
              <Menu.Item color="red" onClick={() => onDelete(data)} leftSection={<IconTrash  style={{ width: rem(14), height: rem(14) }} /> }> Delete </Menu.Item>
            </Menu.Dropdown>
        </Menu>        
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

    
    <Table withRowBorders miw={700}>
      <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Employee </Table.Th>
          <Table.Th style={{ color: "#404044" }}>Visitor</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Date</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Start</Table.Th>
          <Table.Th style={{ color: "#404044" }}>End</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Status</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
  );
}

