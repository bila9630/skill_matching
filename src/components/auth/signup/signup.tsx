import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Button,
} from '@mantine/core';
import classes from './signup.module.css';
import Link from 'next/link';
import { pb } from "@/src/utils/data";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { hasLength, isEmail, isNotEmpty, matchesField, useForm } from '@mantine/form';
import { CreateUser } from '@/src/utils/interfaces';
import { useState } from 'react';

export function SignUp() {
    const router = useRouter()
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            password: "",
            passwordConfirm: "",
        },

        validate: {
            name: isNotEmpty("Name is required"),
            email: isEmail("Invalid email"),
            password: hasLength({ min: 8 }, "Password must be at least 8 characters long"),
            passwordConfirm: matchesField("password", "Passwords are not the same"),
        }
    })

    const createUser = async (userData: CreateUser) => {
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
            await pb.collection('users').create(userDataLowerCase);
            await pb.collection('users').authWithPassword(userDataLowerCase.email, userDataLowerCase.password)
            setCookie('pb_auth', pb.authStore.token);

            // move to home page
            router.push("/home")
        } catch (error: any) {
            setLoading(false);
            // error.message is generic but it should be like that for security reasons
            // setError(error.message);
            setError("email is invalid or already in use")
        }
    }

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Sign up!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account?{' '}
                <Anchor size="sm" component={Link} href={"/signin"}>
                    Login
                </Anchor>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {/* submitted values looks like this: {"name": "Max Mustermann", "email": "max@web.de", password: "pass", passwordConfirm: "pass"} */}
                <form onSubmit={form.onSubmit((values) => { createUser(values) })}>
                    <TextInput label="Name" placeholder="John Doe" required {...form.getInputProps("name")} />
                    <TextInput label="Email" placeholder="you@gmail.com" required my={"md"} {...form.getInputProps("email")} />
                    <PasswordInput label="Password" placeholder="Your password" required mt="md" {...form.getInputProps("password")} />
                    <PasswordInput label="Repeat password" placeholder="Repeat your password" required mt="md" {...form.getInputProps("passwordConfirm")} />
                    <Checkbox defaultChecked required mt="lg"
                        label={
                            <>
                                I agree to{" "}
                                <Anchor href="/terms" component={Link} target="_blank" inherit>terms and conditions</Anchor>
                            </>
                        } />

                    {/* error handling message */}
                    {error == "" ? null : <Text c="red" mt="md" ta={"center"}>{error}</Text>}
                    {/* loading message */}
                    {loading ? <Text c="yellow" mt="md" ta={"center"}>Loading...</Text> : null}

                    <Button fullWidth mt="xl" type="submit" disabled={loading ? true : false}>
                        Sign up
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}