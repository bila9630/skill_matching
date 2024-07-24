import React, { ReactElement, useEffect, useState } from "react"
import Rootlayout from "../components/layout/Rootlayout"
import { Badge, Button, Grid, MultiSelect, Select, Space, Tabs, Title } from "@mantine/core"
import { UserTable } from "@/src/components/table/userTable/userTable"
import Breadcrumb from "@/src//components/breadcrumb/Breadcrumb"
import { pb } from "../utils/data"
import { notifications } from "@mantine/notifications"

const Talent = () => {
    const [userCount, setUserCount] = useState<number>()


    useEffect(() => {
        getCountTalent();
    }, []);

    const getCountTalent = async () => {
        try {
            const record = await pb.collection('count_users').getOne("1");
            setUserCount(record.total_users)
        } catch (error) {
            notifications.show({ message: "Failed to fetch user count!", color: "red" })
        }
    }

    return (
        <div>
            <Space h="sm" />
            <Breadcrumb />

            {/* Title */}
            <Title order={3}>Talent</Title>
            <Space h="md" />

            {/* Tabs */}
            <Tabs defaultValue="overview">
                <Tabs.List>
                    <Tabs.Tab value="overview" rightSection={<Badge size="xs" variant="light" color="gray">{userCount}</Badge>}>Overview</Tabs.Tab>
                    <Tabs.Tab value="favorites" rightSection={<Badge size="xs" variant="light" color="gray">2</Badge>}>Favorites</Tabs.Tab>
                </Tabs.List>

                <Space h="xs" />

                <Tabs.Panel value="overview">
                    {/* Filter options */}
                    <Space h="xs" />
                    <Grid gutter={{ base: 5, xs: "md", md: "lg" }}>
                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <MultiSelect
                                label="Technologies"
                                placeholder="Pick value"
                                data={["React", "Angular", "Vue", "Svelte"]}
                                searchable
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <MultiSelect
                                label="Location"
                                placeholder="Pick value"
                                data={["Frankfurt am Main", "Berlin", "München", "Hamburg"]}
                                searchable
                            />
                        </Grid.Col>

                        <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                            <Select
                                label="Status"
                                placeholder="Pick value"
                                data={["Active", "Not active"]}
                                searchable
                            />
                        </Grid.Col>

                    </Grid>

                    {/* Results */}
                    <Space h="sm" />
                    <UserTable />
                </Tabs.Panel>


                <Tabs.Panel value="favorites">
                    Favorites selected candidates
                </Tabs.Panel>
            </Tabs>


        </div>
    )
}

Talent.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default Talent