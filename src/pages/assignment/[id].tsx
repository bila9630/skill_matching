import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb'
import Rootlayout from '@/src/components/layout/Rootlayout'
import { Anchor, Avatar, Badge, Card, Grid, Group, Space, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const Assignment = () => {
    const router = useRouter()
    const { id } = router.query

    const skills = ["Angular", "React", "Vue", "Mainframe", "Java", "Kotlin", "Swift", "Python", "R", "Machine Learning", "SQL", "Tableau"]
    const views = 6
    const createdAt = "01.06.2024"
    const modifiedAt = "01.06.2024"

    const item = {
        avatar:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png",
        name: "Robert Wolfkisser",
        job: "Software Engineer",
    }

    return (
        <div>
            <Space h="sm" />
            <Breadcrumb items={[
                { title: "Posting", href: "/posting" },
                { title: "Assignment", href: `/assignment/${id}` }
            ]} />

            <Title order={3}>Assignment</Title>
            <Space h="lg" />

            <Grid>
                {/* Description Card */}
                <Grid.Col span={8}>
                    <Card withBorder>
                        <Grid gutter={"xs"}>
                            <Grid.Col span={4}>
                                <Text fw={500}>Contact Information</Text>

                                <Space h="xs" />
                                <Group gap="sm">
                                    <Avatar size={40} src={item.avatar} radius={40} />
                                    <div>
                                        <Text fz="sm" fw={500}>
                                            <Anchor component={Link} href="/profile/1" size="sm" underline="hover" c={"gray"}>
                                                {item.name}
                                            </Anchor>
                                        </Text>
                                        <Text c="dimmed" fz="xs">
                                            {item.job}
                                        </Text>
                                    </div>
                                </Group>
                            </Grid.Col>

                            <Grid.Col span={4}>
                                <Text fw={500}>Duration</Text>
                                <Text fs={"xs"}>01.06.2024 - 31.08.2024</Text>
                            </Grid.Col>

                            <Grid.Col span={4}>
                                <Text fw={500}>Time Commitment</Text>
                                <Text fs={"xs"}>10 hours / week</Text>
                            </Grid.Col>
                        </Grid>
                    </Card>

                    <Space h="md" />
                    <Card withBorder mih={"63vh"} radius="md" p={"lg"}>
                        <Text fw={500} size="lg">Description</Text>
                        <Space h="lg" />
                        <Text>Looking for a professional who can help us to manage our accounting process in a sustainable way. We are a small company with 10 employees and we are looking for someone who can help us to manage our accounting process in a sustainable way. We are a small company with 10 employees and we are looking for someone who can help us to manage our accounting process in a sustainable way. We are a small company with 10 employees and we are looking for someone who can help us to manage our accounting process in a sustainable way. We are a small company with 10 employees and we are looking for someone who can help us to manage our accounting process in a sustainable way. We are a small company with 10 employees and we are looking for someone who can help us to manage our accounting process in a sustainable way. We are a small company with 10 employees and we are looking for someone who can help us to manage our accounting process in a sustainable way.</Text>
                    </Card>
                </Grid.Col>

                {/* General Card */}
                <Grid.Col span={4}>
                    <Card withBorder mih={"80vh"}>
                        <Stack gap="lg">
                            <Text fw={500} size="lg">General</Text>

                            <div>
                                <Text fw={500} mb={"xs"}>Posting status</Text>
                                <Badge color="green">Active</Badge>
                            </div>

                            <div>
                                <Text fw={500}>Skills</Text>
                                <Space h="xs" />
                                <Group gap="xs">
                                    {skills.map((skill) => (
                                        <Badge color="gray" key={skill}>{skill}</Badge>
                                    ))}
                                </Group>
                            </div>

                            <div>
                                <Text fw={500}>Views</Text>
                                <Text fs={"xs"}>{views}</Text>
                            </div>

                            <div>
                                <Text fw={500}>Created At</Text>
                                <Text fs={"xs"}>{createdAt}</Text>
                            </div>

                            <div>
                                <Text fw={500}>Last Modified At</Text>
                                <Text fs={"xs"}>{modifiedAt}</Text>
                            </div>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>

        </div>
    )
}

Assignment.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default Assignment