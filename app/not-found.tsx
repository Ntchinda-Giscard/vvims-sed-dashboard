import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from '@/app/css/NotFountTitle.module.css';
import Link from "next/link";

export default function NotFound() {
  return (
    <Container className={classes.root}>
      <div className={classes.label}>
        <span style={{color: "#404040", fontSize: 35 }}>
          404
        </span>
      </div>
      <Title className={classes.title} style={{ color: "HighlightText" }} >You have found a secret place.</Title>
      <Text c="dimmed" size="lg" ta="center" className={classes.description}>
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group justify="center">
        <Button component={Link} href={"/dashboard"} variant="subtle" size="md">
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
