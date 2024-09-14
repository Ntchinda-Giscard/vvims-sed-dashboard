import { Group, Pagination } from "@mantine/core";
import { useState } from "react";

function FootPage({activePage, onPage, total}: any) {
   
    return ( <>
    <Group justify="flex-end">
        <Pagination mt={15} value={activePage} onChange={(v) => onPage(v)} size="sm" radius="md" withEdges total={total} />
    </Group>
    </> );
}

export default FootPage;