import { ActionIcon, Avatar } from '@mantine/core';
import { IconBellFilled, IconSettingsFilled } from '@tabler/icons-react';
import { Poppins } from "next/font/google";
import cx from 'clsx'
import classes from '@/app/components/css/topBar.module.css'

const poppins = Poppins({ subsets: ["latin"], weight:["700"] });


export default function UserTopButton(){

    return(
        <div className="flex flex-row gap-2 items-center">
            <ActionIcon variant="subtle" color="white" radius="xs" aria-label="notifications">
                <IconBellFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="white" radius="xs" aria-label="Settings">
                <IconSettingsFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <Avatar radius="xl" />
            <p className={cx([classes.username, poppins.className])}> User </p>
        </div>
    )
}