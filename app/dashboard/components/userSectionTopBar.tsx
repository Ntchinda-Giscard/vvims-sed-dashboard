import { ActionIcon, Avatar } from '@mantine/core';
import { IconBellFilled, IconSettingsFilled } from '@tabler/icons-react';
import { Poppins } from "next/font/google";
import cx from 'clsx'
import classes from '@/app/dashboard/components/css/topBar.module.css'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const poppins = Poppins({ subsets: ["latin"], weight:["700"] });


export default function UserTopButton(){
    //@ts-ignore
    const userInfo = useSelector((state: any) => state.auth.userInfo)

    useEffect(() =>{
        console.log(userInfo)
    },[userInfo])

    return(
        <div className="flex flex-row gap-2 items-center">
            <ActionIcon variant="subtle" color="white" radius="xs" aria-label="notifications">
                <IconBellFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <ActionIcon variant="subtle" color="white" radius="xs" aria-label="Settings">
                <IconSettingsFilled style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
            <Avatar radius="xl" />
            <p className={cx([classes.username, poppins.className])}> {userInfo?.employee?.firstname} </p>
            <p className={cx([classes.username, poppins.className])}> {userInfo?.employee?.lastname} </p>
        </div>
    )
}