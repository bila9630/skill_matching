import {
    Paper, Title, Text, TextInput,
    Button, Container, Group, Anchor,
    Center, rem,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import classes from './forgotPassword.module.css';
import Link from 'next/link';

export function ForgotPassword() {
    return (
        <Container size={460} my={30}>
            <Title className={classes.title} ta="center">
                Forgot your password?
            </Title>
            <Text c="dimmed" fz="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput label="Your email" placeholder="me@mantine.dev" required />
                <Group justify="space-between" mt="lg" className={classes.controls}>
                    <Center inline className={classes.control} c={"dimmed"}>
                        <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                        <Anchor ml={5} component={Link} href="/signin" size="sm" underline="hover" c={"dimmed"}>
                            Back to the login page
                        </Anchor>
                    </Center>
                    <Button className={classes.control}>Reset password</Button>
                </Group>
            </Paper>
        </Container>
    );
}