"use client"
import { AppShell, Burger, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserTopButton from './userSectionTopBar';
import classes from "@/app/components/css/topBar.module.css"
import { Poppins } from "next/font/google";
import cx from 'clsx';
import Link from "next/link";
import {links} from "@/app/components/links";
import { usePathname } from 'next/navigation';
import { IconGauge } from '@tabler/icons-react';


const poppins_logo = Poppins({ subsets: ["latin"], weight:["500"] });
const poppins_light = Poppins({ subsets: ["latin"], weight:["400"] });


export default function ResponsiveSizes(
    {
        children,
      }: Readonly<{
        children: React.ReactNode;
      }>
) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 50, md: 100, lg: 200 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header styles={{
        header:{
            background: "#386BF6"
        }
      }}>
        <Group h="100%" px="md">
          
          <Group justify='space-between' w="100%">
            
            <span className={cx([classes.logo, poppins_logo.className])}>VVIMS <span style={{color: "#17DBCC"}}>®</span></span>
            <UserTopButton />
          </Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </Group>
            
      </AppShell.Header>
      <AppShell.Navbar>
        <div className="flex flex-col gap-3">
        {links.map((l , index) => (
          <div className="flex flex-row">
            {/* <>{l?.icon}</> */}
              <NavLink 
                href={l?.link} 
                className={cx([poppins_light.className, isActive(l?.link) ? classes.active : classes.inactive] )}
                childrenOffset={28}
                label= {l?.label} 
                key={l?.label}
                active= { isActive(l?.link)} 
                variant="subtle"

              > 
                
              </NavLink>
          </div>
            
          ))}
        </div>
        
      </AppShell.Navbar>
      <AppShell.Main styles={{ main: {backfround: "#D9D9D9"} }} >{children}</AppShell.Main>
    </AppShell>
  );
}