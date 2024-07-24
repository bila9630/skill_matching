import { Button, Card, Center, Divider, Group, Modal, PasswordInput, Space, Switch, Text } from '@mantine/core';
import classes from './SettingCard.module.css';
import ColorToggle from '../colorToggle/colorToggle';
import { pb } from '@/src/utils/data';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useDisclosure } from '@mantine/hooks';
import { hasLength, matchesField, useForm } from '@mantine/form';

const PasswordModal = (passOpened: boolean, closePass: () => void) => {
    const form = useForm({
        initialValues: {
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
        },

        validate: {
            currentPassword: hasLength({ min: 8 }, "Password must be at least 8 characters long"),
            newPassword: hasLength({ min: 8 }, "Password must be at least 8 characters long"),
            repeatPassword: matchesField("newPassword", "Passwords are not the same")
        }
    })

    const resetPassword = async (values: any) => {
        try {
            console.log(values)
        } catch (error: any) {
            console.log(error)
        }

    }

    return (
        <Modal opened={passOpened} onClose={closePass} size={"40%"} title="Change password" centered>
            <form onSubmit={form.onSubmit((values) => resetPassword(values))}>
                <PasswordInput
                    label="Current password"
                    placeholder="Enter current password"
                    required mt="md"
                    {...form.getInputProps("currentPassword")}
                />

                <PasswordInput
                    label="New password"
                    placeholder="Enter new password"
                    required mt="md"
                    {...form.getInputProps("newPassword")}
                />

                <PasswordInput
                    label="Repeat new password"
                    placeholder="Repeat new password"
                    required mt="md"
                    {...form.getInputProps("repeatPassword")}
                />

                <Center>
                    <Button mt={"xl"} type="submit">Change password</Button>
                </Center>
            </form>
        </Modal>
    )
}

const DeleteAccountModal = (deleteOpened: any, closeDelete: any) => {
    const router = useRouter()

    const deleteAccount = async () => {
        try {
            console.log("Account deleted")

            router.push("/signin")
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <Modal opened={deleteOpened} onClose={closeDelete} title="Delete your profile" centered>
            <Text>
                Are you really sure, you want to delete your account? This action is irreversible and all your data will be deleted permanently.
            </Text>
            <Group mt={"xl"} justify="flex-end">
                <Button color="gray" onClick={() => { closeDelete() }}>No don&apos;t delete it</Button>
                <Button color="red" onClick={() => { deleteAccount() }}>Delete Account</Button>
            </Group>
        </Modal>
    )
}



export function SettingCard() {
    const router = useRouter()
    const [passOpened, { open: openPass, close: closePass }] = useDisclosure(false);
    const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);

    return (
        <Card withBorder radius="md" p="xl" className={classes.card}>
            {/* Application section */}
            <Text fz={"lg"} fw={500}>Application</Text>
            <Divider my={"md"} />
            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Appearance</Text>
                    <Text size="xs" c="dimmed">
                        Customize how the app looks on your device
                    </Text>
                </div>

                <ColorToggle />
            </Group>
            <Space h="sm" />

            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Email</Text>
                    <Text size="xs" c="dimmed">
                        Current email address:
                    </Text>
                </div>
                <Text>
                    random_email@web.de
                </Text>
            </Group>
            <Space h="sm" />

            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Password</Text>
                    <Text size="xs" c="dimmed">
                        Change your password
                    </Text>
                </div>
                <Button variant="outline" color="gray" onClick={openPass}>Change password</Button>
            </Group>
            <Space h="sm" />

            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Delete Account</Text>
                    <Text size="xs" c="dimmed">
                        Permanently delete your account
                    </Text>
                </div>
                <Button variant="outline" color="red" onClick={openDelete}>Delete account</Button>
            </Group>


            {/* Notifications section */}
            <Space h="xl" />
            <Text fz={"lg"} fw={500}>Notifications</Text>
            <Divider my={"md"} />

            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Skills update</Text>
                    <Text size="xs" c="dimmed">
                        Receive reminders to update your skills
                    </Text>
                </div>

                <Switch defaultChecked onLabel="ON" offLabel="OFF" className={classes.switch} size="md" />
            </Group>
            <Space h="sm" />


            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Project posting</Text>
                    <Text size="xs" c="dimmed">
                        Receive notifications about interesting posts
                    </Text>
                </div>

                <Switch defaultChecked onLabel="ON" offLabel="OFF" className={classes.switch} size="md" />
            </Group>
            <Space h="sm" />


            {/* Customer Support section */}
            <Space h="xl" />
            <Text fz={"lg"} fw={500}>Customer Support</Text>
            <Divider my={"md"} />

            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Support Email</Text>
                    <Text size="xs" c="dimmed">
                        Send us an email if you have any questions
                    </Text>
                </div>
                <Text>lorem ipsum</Text>
            </Group>

            <Space h="sm" />

            <Group justify="space-between" wrap="nowrap" gap={"xl"}>
                <div>
                    <Text>Instagram</Text>
                    <Text size="xs" c="dimmed">
                        Social media
                    </Text>
                </div>
                <Text>Talent-Marketplace</Text>
            </Group>

            <Space h="xl" />

            <div>
                <Button
                    color={"red"}
                    onClick={() => {
                        pb.authStore.clear()
                        deleteCookie("pb_auth");
                        router.push("/signin")
                    }}
                >
                    Sign out
                </Button>
            </div>

            {PasswordModal(passOpened, closePass)}
            {DeleteAccountModal(deleteOpened, closeDelete)}
        </Card>

    );
}


