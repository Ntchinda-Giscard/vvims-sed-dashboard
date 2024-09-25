import { Group, Pagination } from "@mantine/core";
import {
    IconArrowBarToRight,
    IconArrowBarToLeft,
    IconArrowLeft,
    IconArrowRight,
    IconGripHorizontal,
  } from '@tabler/icons-react';

function FootPage({activePage, onPage, total}: any) {
   
    return ( <>
    <Group justify="flex-end">
        <Pagination 
            value={activePage} 
            onChange={(v) => onPage(v)} 
            size="sm" 
            radius="md" 
            withEdges 
            total={total} 

            nextIcon={IconArrowRight}
            previousIcon={IconArrowLeft}
            firstIcon={IconArrowBarToLeft}
            lastIcon={IconArrowBarToRight}
            dotsIcon={IconGripHorizontal}
        />
    </Group>
    </> );
}

export default FootPage;