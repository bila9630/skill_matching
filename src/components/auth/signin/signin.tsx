import {
    TextInput, PasswordInput, Checkbox, Anchor,
    Paper, Title, Text, Container, Group, Button,
} from '@mantine/core';
import classes from './signin.module.css';
import Link from 'next/link';
import { pb } from '@/src/utils/data';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { hasLength, isEmail, useForm } from '@mantine/form';
import { useState } from 'react';

interface LoggedInUser {
    email: string,
    password: string
}

export function SignIn() {
    const router = useRouter()
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({
        initialValues: {
            email: "",
            password: "",
        },

        validate: {
            email: isEmail("Invalid email"),
            password: hasLength({ min: 8 }, "Password must be at least 8 characters long"),
        }
    })

    const loginUser = async (userData: LoggedInUser) => {
        try {
            // reset error and loading state
            setError("");
            setLoading(true);

            // Convert email to lowercase
            const userDataLowerCase = {
                ...userData,
                email: userData.email.toLowerCase(),
            };

            // authentification
            // await signInWithPassword(userData.email, userData.password);
            await pb.collection('users').authWithPassword(userDataLowerCase.email, userDataLowerCase.password);
            setCookie('pb_auth', pb.authStore.token);

            // move to home page
            router.push("/home")
        } catch (error: any) {
            setLoading(false);
            setError(error.message);
        }
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component={Link} href={"/signup"}>
                    Create account
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form onSubmit={form.onSubmit((values) => { loginUser(values) })}>
                    <TextInput label="Email" placeholder="you@gmail.com" required {...form.getInputProps("email")} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")} />

                    <Group justify="space-between" mt="lg">
                        <Checkbox label="Remember me" defaultChecked />
                        <Anchor size="sm" component={Link} href={"/forgetpassword"}>
                            Forgot password?
                        </Anchor>
                    </Group>

                    {/* error handling message */}
                    {error == "" ? null : <Text c="red" mt="md" ta={"center"}>{error}</Text>}
                    {/* loading message */}
                    {loading ? <Text c="yellow" mt="md" ta={"center"}>Loading...</Text> : null}

                    <Button fullWidth mt="xl" type="submit" disabled={loading ? true : false}>
                        Sign in
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}