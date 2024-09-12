import { Badge, Group, Paper } from '@mantine/core'
import Image from 'next/image'
import { ReactElement } from 'react'
import classes from "@/app/components/css/dashboard.module.css";
import { Poppins } from "next/font/google";
import cx from 'clsx'
import { IconChevronUp } from '@tabler/icons-react';

const font_heading = Poppins({ subsets: ["latin"], weight:["500"] });
const font_amnt = Poppins({ subsets: ["latin"], weight:["700"] });
const font_perc = Poppins({ subsets: ["latin"], weight:["400"] });

interface dashboard_card{
    title: string
    amount: number
    perc: number
    bg_img: string
    img: string
}

function CardDashboard({title, amount, perc, bg_img, img}: dashboard_card) {
    return ( <>
    <Paper 
        withBorder
        radius="md"
        w={350}
    >
        <Group justify={'space-between'}>
            <Group p={10} gap={10}>
                <Image src={img} alt="img" height={75} width={75} />
                <p className={cx([classes.cardTitle, font_heading])}> {title} </p>
            </Group>
            <Image src={bg_img} alt='img' />
        </Group>
        <Group justify="flex-start" p={10} pb={0}>
            <p className={cx([font_amnt.className, classes.amount])}> {amount} </p>
            <Badge leftSection={<IconChevronUp />} variant="light" color="#16DBCC" size="lg"  radius="md">  {perc}% </Badge>
        </Group>
        <Group p={10} pt={0}>
            <p className={cx([classes.perc, font_perc.className])}> {perc}% </p>
            <p className={cx([classes.percDesc, font_perc.className])}> Total Increase </p>
        </Group>
    </Paper>

    </> );
}

export default CardDashboard;