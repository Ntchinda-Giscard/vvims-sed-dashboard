import { Group, Paper, Text, ThemeIcon, SimpleGrid } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from './StatsGridIcons.module.css';
import { useSubscription } from '@apollo/client';
import { useEffect } from 'react';
import { GET_ALL_VISITS, GET_PERCENTAGE_DIFF } from '../../queries/get_all_visits';

const data = [
  { title: 'Completed', value: '0', diff: 0 },
  { title: 'Todays ', value: '0', diff: -0 },
  { title: 'Upcoming ', value: '0', diff: 0 },
];

export function StatsGridIcons() {

  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    const data = [
      { title: 'Completed', value: '0', diff: 0 },
      { title: 'Todays ', value: '0', diff: -0 },
      { title: 'Upcoming ', value: '0', diff: 0 },
    ];

    useEffect(() =>{

    },[])

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="apart">
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="xs" className={classes.label}>
              {stat.title}
            </Text>
            <Text c="#404040" fw={700} fz="xl">
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={38}
            radius="md"
          >
            <DiffIcon size="1.8rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text c="dimmed" fz="sm" mt="md">
          <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
            {stat.diff}%
          </Text>{' '}
          {stat.diff > 0 ? 'increase' : 'decrease'} compared to last month
        </Text>
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}