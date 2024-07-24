import React, { useState } from 'react'
import { Button, Grid, Group, NumberInput, Space, TextInput } from '@mantine/core'
import { DateInput } from '@mantine/dates';
import { IconSearch } from '@tabler/icons-react';
import InputSkill from '../inputSkill/inputSkill';

const PostingFilter = () => {
    const [date, setDate] = useState<Date | null>(null);
    const [search, setSearch] = useState<string>("");

    return (
        <div>
            {/* Searchbar */}
            <Group>
                <TextInput
                    leftSectionPointerEvents="none"
                    leftSection={<IconSearch size={16} />}
                    style={{ flex: 1, minWidth: 0 }}
                    placeholder="Enter name"
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                />
                <Group gap={"xs"}>
                    <Button>Search</Button>
                    <Button variant="subtle" onClick={() => { setSearch("") }}>Clear</Button>
                </Group>
            </Group>

            {/* Filter options */}
            <Space h="md" />
            <Grid gutter={{ base: 5, xs: "md", md: "lg" }}>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>

                    <InputSkill />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <NumberInput
                        label="Time commitment"
                        placeholder="Enter minimum hours"
                        min={0}
                        max={40}
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <DateInput
                        value={date}
                        onChange={setDate}
                        label="Start date"
                        placeholder="Enter start date"
                    />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <TextInput
                        label="Owner"
                        placeholder="Owner name"
                    />
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default PostingFilter