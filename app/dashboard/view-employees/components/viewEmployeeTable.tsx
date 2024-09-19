"use client"
import { ActionIcon, Table, Menu, rem, ScrollArea,  } from '@mantine/core';
import { IconTrash, IconEdit, IconDotsVertical, IconEye, IconUserX, IconUserCheck } from '@tabler/icons-react';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useState } from 'react';
import cx from 'clsx';
import classes from "@/app/dashboard/view-employees/table.module.css";

export default function ViewEmployeeTable({datas, onEdit, onDelete, onDeactivate}:any) {
  const [scrolled, setScrolled] = useState(false)
  const rows = datas?.map((data: {
    function: ReactNode;
      firstname: any;
      lastname: any; id: Key | null | undefined; region: any; department: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; service: { text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }; phone_number: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; position: {
        function: ReactNode; text_content: { content: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; 
}; 
}) => (
    <Table.Tr key={data?.id}>
      <Table.Td style={{ color: "#404044" }} >{ `${data?.firstname}` + " "+ `${data?.lastname}`}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.department?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.service?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.position?.text_content?.content}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.function}</Table.Td>
      <Table.Td style={{ color: "#404044" }}>{data?.phone_number}</Table.Td>
      <Table.Td>
        <ActionIcon  onClick={() => onDelete(data)} variant="transparent" color="gray" aria-label="Settings">
            <Menu shadow="md">
                <Menu.Target>
                    <IconDotsVertical style={{ width: '70%', height: '70%' }}  stroke={1.5} />
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item color="green" onClick={() => onEdit(data)} leftSection={<IconEye  style={{ width: rem(14), height: rem(14) }} /> }> View </Menu.Item>
                  <Menu.Item color="orange" onClick={() => onDeactivate(data)} leftSection={<IconUserX  style={{ width: rem(14), height: rem(14) }} />}> Deactivate </Menu.Item>
                  <Menu.Item color="red" onClick={() => onDelete(data)} leftSection={<IconTrash  style={{ width: rem(14), height: rem(14) }} /> }> Delete </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </ActionIcon>
        {/* <ActionIcon onClick={() => onEdit(data)} variant="transparent" color="green" aria-label="Settings">
          <IconEdit style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon>
        <ActionIcon  onClick={() => onDelete(data)} variant="transparent" color="red" aria-label="Settings">
          <IconTrash style={{ width: '70%', height: '70%' }}  stroke={1.5} />
        </ActionIcon> */}
        
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea h={400} onScrollPositionChange={({y}) => setScrolled(y !== 0)}>

    
    <Table withRowBorders miw={700}>
      <Table.Thead className={cx(classes.header, {[classes.scrolled]: scrolled})}>
        <Table.Tr>
          <Table.Th style={{ color: "#404044" }}> Name </Table.Th>
          <Table.Th style={{ color: "#404044" }}>Department</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Service</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Position</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Function</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Phone Number</Table.Th>
          <Table.Th style={{ color: "#404044" }}>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
    </ScrollArea>
  );
}

