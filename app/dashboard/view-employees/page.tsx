"use client"
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Button, Group, Box, Paper } from '@mantine/core';

export default function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {/* ...other content */}
        Help me
        <Paper>
            
        </Paper>
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>Toggle overlay</Button>
      </Group>
    </>
  );
}