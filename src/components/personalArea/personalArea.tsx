import { ActionIcon, Card, Group, ScrollArea, Space, Tabs, Text, rem } from '@mantine/core'
import { IconEdit, IconPresentation, IconRollercoaster, IconTrash } from '@tabler/icons-react'
import React from 'react'

const PersonalArea = () => {
    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <>
            <Card withBorder radius="md" p="lg" mih={"81vh"}>
                <Text fw={"bold"}>Personal area</Text>
                <Space h="lg" />

                <Tabs defaultValue="assignments">
                    <Tabs.List grow justify="center">
                        <Tabs.Tab value="assignments" leftSection={<IconRollercoaster style={iconStyle} />}>
                            Your stretch assignment
                        </Tabs.Tab>
                        <Tabs.Tab value="projects" leftSection={<IconPresentation style={iconStyle} />}>
                            Your project postings
                        </Tabs.Tab>
                    </Tabs.List>

                    <Space h="md" />

                    <Tabs.Panel value="assignments">
                        <ScrollArea h={"60vh"}>
                            <Card withBorder>
                                <Group justify="space-between">
                                    <Text>Hello World</Text>

                                    <Group gap={"xs"}>
                                        <ActionIcon variant="subtle" color="blue">
                                            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red">
                                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                            </Card>


                        </ScrollArea>

                    </Tabs.Panel>

                    <Tabs.Panel value="projects">
                        <ScrollArea h={"60vh"}>
                            <Card withBorder>
                                <Group justify="space-between">
                                    <Text>Hello World</Text>

                                    <Group gap={"xs"}>
                                        <ActionIcon variant="subtle" color="blue">
                                            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red">
                                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                            </Card>

                            <Space h="md" />

                            <Card withBorder>
                                <Group justify="space-between">
                                    <Text>Hello World</Text>

                                    <Group gap={"xs"}>
                                        <ActionIcon variant="subtle" color="blue">
                                            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                        <ActionIcon variant="subtle" color="red">
                                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                                        </ActionIcon>
                                    </Group>
                                </Group>
                            </Card>

                        </ScrollArea>
                    </Tabs.Panel>

                </Tabs>


                <Space h="xs" />
            </Card>



        </>
    )
}

export default PersonalArea