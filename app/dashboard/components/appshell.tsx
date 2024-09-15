"use client"
import { AppShell, Burger, Group, NavLink, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import UserTopButton from './userSectionTopBar';
import classes from "@/app/dashboard/components/css/topBar.module.css"
import { Poppins } from "next/font/google";
import cx from 'clsx';
import {links} from "@/app/dashboard/components/links";
import { usePathname } from 'next/navigation';
import Link from 'next/link';


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
    console.log(pathname)
    if (path === '/dashboard') {
      return pathname === '/dashboard';
    }
    console.log("Path :===>", path)
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
            background: "#386BF6",
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
      <AppShell.Navbar
        styles={{
          navbar:{
          }
        }}
      >
        <div className="flex flex-col gap-3">
        {links.map((l , index) => (
          // <div className="flex flex-row">
              <NavLink 
                href={l?.sub_links.length > 0 ? "" : l?.link} 
                className={cx([poppins_light.className, isActive(l?.link) ? classes.active : classes.inactive] )}
                // childrenOffset={28}
                label= {l?.label} 
                key={l?.label}
                active= { l?.sub_links.length < 0 ? isActive(l?.link) : false} 
                variant="subtle"
                leftSection={<l.icon size={"1rem"} stroke={1} />}
                component={Link}
              >
                 { 
                  l?.sub_links.length > 0 ?
                  <span>
                    {
                    l?.sub_links.map((sub, _) => (
                        <NavLink 
                          href={sub?.link} 
                          key={sub?.label} 
                          label={sub?.label} 
                          variant="subtle" 
                          active={isActive(sub?.link)}
                          defaultOpened={isActive(sub?.link)}
                          component={Link}
                        />
                      ))
                    }
                  </span>
                  : null
              }
              </NavLink>
            
        ))}
        </div>
        
      </AppShell.Navbar>
      <AppShell.Main styles={{ main: {backfround: "#D9D9D9"} }} >{children}</AppShell.Main>
    </AppShell>
  );
}