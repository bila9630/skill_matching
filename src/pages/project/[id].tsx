import Breadcrumb from '@/src/components/breadcrumb/Breadcrumb'
import Rootlayout from '@/src/components/layout/Rootlayout'
import { ActionIcon, Badge, Button, Card, Grid, Group, Skeleton, Space, Stack, Text, Title, rem } from '@mantine/core'
import { IconBrandSlack, IconHourglassLow, IconStar } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

const Posting = () => {
    const router = useRouter()
    const { id } = router.query

    const skills = ["Angular", "React", "Vue", "Mainframe", "Java", "Kotlin", "Swift", "Python", "R", "Machine Learning", "SQL", "Tableau"]
    const views = 6
    const createdAt = "01.06.2024"
    const modifiedAt = "01.06.2024"

    return (
        <div>
            <Space h="sm" />
            <Breadcrumb items={[
                { title: "Posting", href: "/posting" },
                { title: "Project", href: `/project/${id}` }
            ]} />

            <Group justify="space-between">
                <Title order={3}>Sustainability Management - Advanced Accounting {id}</Title>
                <Group>
                    <Button rightSection={<IconBrandSlack size={18} />} variant="outline">
                        Contact on Slack
                    </Button>
                    <ActionIcon variant="subtle" color="gray" size="lg">
                        <IconStar style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Group>
            <Space h="lg" />

            <Grid>
                {/* Description Card */}
                <Grid.Col span={8}>
                    <Card withBorder>
                        <Grid gutter={"xs"}>
                            <Grid.Col span={4}>
                                <Text fw={500}>Contact Information</Text>
                                <Text fs={"xs"}>Max Mustermann</Text>
                                <Text fs={"xs"}>max.mustermann@web.de</Text>
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

Posting.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default Posting