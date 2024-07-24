import React, { ReactElement, useState } from 'react'
import Rootlayout from '../components/layout/Rootlayout'
import { Button, Center, Group, MultiSelect, NumberInput, Paper, Space, Text, Textarea, Title, rem, useMantineTheme } from '@mantine/core'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import { IconSquareCheck } from '@tabler/icons-react'
import { isInRange, isNotEmpty, useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { DatePickerInput } from '@mantine/dates'

const CreateAssignment = () => {
    const theme = useMantineTheme();
    const [published, setPublished] = useState<boolean>(false)


    const form = useForm({
        initialValues: {
            description: "",
            skills: [],
            availabilityRange: [new Date(), new Date()],
            timeCommitment: 0,
        },

        validate: {
            skills: isNotEmpty("Enter at least one skill that you would like to work with"),
            availabilityRange: isNotEmpty("Your availability is required"),
            timeCommitment: isInRange({ min: 1, max: 40 }, "Time commitment should be between 1 and 40 hours"),
        }
    })

    const save = async (assignmentData: any) => {
        try {
            console.log(published)
            console.log(assignmentData)

            {
                published ? notifications.show({ message: "Project is now published!", color: "green" })
                    : notifications.show({ message: "Project is now saved as draft!", color: "green" })
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
                { title: "Create assignment", href: "/createAssignment" }
            ]} />

            {/* Title */}
            <Group gap="xs">
                <Title order={3}>Create Assignment</Title>
                <IconSquareCheck
                    style={{ width: rem(25), height: rem(25) }}
                    color={theme.colors.pink[6]}
                    stroke={1.5}
                />
            </Group>
            <Space h="xl" />

            <form onSubmit={form.onSubmit((values) => { save(values) })}>
                <Paper withBorder shadow="md" p={30} radius="md">
                    <Text fz={"md"} fw={700}>Assignment description</Text>
                    <Text c={"dimmed"} fz={"xs"}>The following sections is intended to give more details about the projects you would like to work on</Text>

                    <MultiSelect
                        label="Interested skills area"
                        placeholder="Pick skills"
                        data={["React", "Angular", "Vue", "Svelte"]}
                        searchable
                        required
                        mt={"md"}
                        {...form.getInputProps("skills")}
                    />

                    <DatePickerInput
                        type="range"
                        valueFormat="DD.MM.YYYY"
                        label="Availablity"
                        placeholder="Enter your availability"
                        mt={"md"}
                        required
                        {...form.getInputProps("availabilityRange")}
                    />

                    <NumberInput
                        label="Time commitment (Hours per week)"
                        min={0}
                        max={40}
                        mt={"md"}
                        {...form.getInputProps("timeCommitment")}
                    />

                    <Textarea
                        label="Description"
                        placeholder="Describe the project you would like to work on.."
                        autosize
                        minRows={2}
                        maxRows={12}
                        mt="md"
                        {...form.getInputProps("description")}
                    />
                </Paper>

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

CreateAssignment.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default CreateAssignment