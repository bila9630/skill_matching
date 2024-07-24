import { Badge, Group, Space, Tabs, Title } from '@mantine/core'
import { ReactElement, useState } from 'react'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import { ButtonMenu } from '../components/buttonMenu/buttonMenu'
import Rootlayout from '../components/layout/Rootlayout'
import { AssignmentTable } from '../components/table/assignmentTable/AssignmenTable'
import { ProjectTable } from '../components/table/projectTable/ProjectTable'
import PostingFilter from '../components/postingFilter/PostingFilter'

const Posting = () => {
    const [activeTab, setActiveTab] = useState<string | null>('projects');

    return (
        <div>
            <Space h="sm" />
            <Breadcrumb />

            {/* Title */}
            <Group justify="space-between">
                <Title order={3}>Posting</Title>
                <ButtonMenu />
            </Group>
            <Space h="xl" />

            {/* Filter */}
            <PostingFilter />
            <Space h="md" />

            <Tabs value={activeTab} onChange={setActiveTab}>
                <Tabs.List>
                    <Tabs.Tab value="projects" rightSection={<Badge size="xs" variant="light" color="gray">180</Badge>}>
                        Projects
                    </Tabs.Tab>
                    <Tabs.Tab value="assignments" rightSection={<Badge size="xs" variant="light" color="gray">420</Badge>}>
                        Talents
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="projects">
                    {/* Project Table */}
                    <Space h="md" />
                    <ProjectTable />

                </Tabs.Panel>

                <Tabs.Panel value="assignments">
                    {/* Assignment Table */}
                    <Space h="md" />
                    <AssignmentTable />

                </Tabs.Panel>
            </Tabs>
        </div>
    )
}

Posting.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default Posting