import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb'
import Rootlayout from '@/src/components/layout/Rootlayout'
import { CreatePosting } from '@/src/utils/interfaces'
import { Button, Center, Grid, Group, MultiSelect, NumberInput, Paper, ScrollArea, Space, Text, TextInput, Textarea, Title, rem, useMantineTheme } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { isEmail, isInRange, isNotEmpty, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconPackage } from '@tabler/icons-react'
import React, { ReactElement, useState } from 'react'

const CreateProject = () => {
    const theme = useMantineTheme();
    const [published, setPublished] = useState<boolean>(false)


    const form = useForm({
        initialValues: {
            title: "",
            postingDesc: "",
            contactPerson: "",
            contactPersonEmail: "",
            skills: [],
            durationRange: [new Date(), new Date()],
            timeCommitment: 0,
        },

        validate: {
            title: isNotEmpty("Title is required"),
            postingDesc: isNotEmpty("Description is required"),
            contactPerson: isNotEmpty("Contact person is required"),
            contactPersonEmail: isEmail("Enter a valid email"),
            timeCommitment: isInRange({ min: 1, max: 40 }, "Time commitment should be between 1 and 40 hours"),

        }
    })

    const save = async (postingData: CreatePosting) => {
        try {
            console.log(published)
            console.log(postingData)

            {
                published ? notifications.show({ message: "Project is now published!", color: "green" })
                    : notifications.show({ message: "Project is now save as draft!", color: "green" })
            }
        } catch (error: any) {
            notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
        }
    }

    return (
        <div>
            <Space h="sm" />
            <Breadcrumb items={[
                { title: "Posting", href: "/posting" },
                { title: "Create project", href: "/createProject" }
            ]} />

            <Group gap="xs">
                <Title order={3}>Create Project</Title>
                <IconPackage
                    style={{ width: rem(25), height: rem(25) }}
                    color={theme.colors.blue[6]}
                    stroke={1.5}
                />
            </Group>
            <Space h="xl" />

            <form onSubmit={form.onSubmit((values) => { save(values) })}>
                <Grid>
                    <Grid.Col span={{ base: 12, md: 8 }}>

                        <Paper withBorder shadow="md" p={30} radius="md">
                            <Text fz={"md"} fw={700}>Project description</Text>
                            <Text c={"dimmed"} fz={"xs"}>The following sections is intended to give more details about the projects</Text>

                            <TextInput
                                label="Project title"
                                placeholder="Example: AI Development in the area of sustainability"
                                required
                                mt={"md"}
                                {...form.getInputProps("title")}
                            />

                            <MultiSelect
                                label="Skills"
                                placeholder="Pick skills"
                                data={["React", "Angular", "Vue", "Svelte"]}
                                searchable
                                mt={"md"}
                                {...form.getInputProps("skills")}
                            />

                            <Textarea
                                label="Project description"
                                placeholder="Project XYZ is a project that aims to..."
                                required
                                autosize
                                minRows={4}
                                maxRows={12}
                                mt="md"
                                {...form.getInputProps("postingDesc")}
                            />
                        </Paper>

                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 4 }}>
                        <Paper withBorder shadow="md" p={30} radius="md">
                            <ScrollArea h={"48vh"} scrollbarSize={1}>
                                <Text fz={"md"} fw={700}>Project Details</Text>
                                <Text c={"dimmed"} fz={"xs"}>The following sections is intended to further details about the projects</Text>

                                <TextInput
                                    label="Contact person name"
                                    placeholder="Either you or a delegate"
                                    required
                                    mt={"sm"}
                                    {...form.getInputProps("contactPerson")}
                                />

                                <TextInput
                                    label="Contact person email / slack"
                                    placeholder="Either you or a delegate"
                                    required
                                    mt={"sm"}
                                    {...form.getInputProps("contactPersonEmail")}
                                />

                                <DatePickerInput
                                    type="range"
                                    valueFormat="DD.MM.YYYY"
                                    label="Support duration"
                                    placeholder="Enter support duration"
                                    mt={"md"}
                                    {...form.getInputProps("durationRange")}
                                />

                                <NumberInput
                                    label="Time commitment (Hours per week)"
                                    min={0}
                                    max={40}
                                    mt={"md"}
                                    required
                                    {...form.getInputProps("timeCommitment")}
                                />

                            </ScrollArea>
                        </Paper>
                    </Grid.Col>
                </Grid>
                <Center my="xl">
                    <Group>
                        <Button type="submit" onClick={() => { setPublished(true) }} >
                            Publish
                        </Button>
                        <Button variant="outline" type="submit" onClick={() => { setPublished(false) }}>
                            Save as draft
                        </Button>
                    </Group>
                </Center>
            </form>
        </div>
    )
}

CreateProject.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default CreateProject