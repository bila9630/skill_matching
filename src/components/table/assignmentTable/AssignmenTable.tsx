import { Avatar, Table, Group, Text, ActionIcon, rem, Badge, ScrollArea, Button, Anchor } from "@mantine/core";
import {
    IconExternalLink,
    IconStar,
    IconStarFilled,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const data = [
    {
        name: "Robert Wolfkisser",
        job: "Software Engineer",
        interestedArea: ["React", "TypeScript", "Node.js", "GraphQL", "REST", "MongoDB"],
        startDate: "01.06.2024 - 01.12.2024",
        duration: "2 hours / day",
    },
    {
        name: "Jill Jailbreaker",
        job: "Scrum Master",
        star: true,
        interestedArea: ["Scrum", "Agile", "Jira", "Confluence", "Kanban", "Lean"],
        startDate: "01.06.2024 - 01.09.2024",
        duration: "5 hours / week"
    },
    {

        name: "Henry Silkeater",
        job: "Designer",
        interestedArea: ["Figma", "Sketch", "Adobe XD", "Photoshop"],
        startDate: "01.06.2024 - 01.12.2024",
        duration: "10 hours / week"
    },
    {

        name: "Bill Horsefighter",
        job: "Designer",
        interestedArea: ["Figma", "Sketch", "Adobe XD", "Photoshop"],
        startDate: "01.06.2024 - 01.12.2024",
        duration: "10 hours / week"
    },
    {

        name: "Jeremy Footviewer",
        job: "Associate Cloud Consultant",
        interestedArea: ["AWS", "Azure", "Google Cloud", "Kubernetes"],
        startDate: "01.06.2024 - 01.06.2025",
        duration: "5 hours / week"
    },
    {

        name: "Alice Codebreaker",
        job: "Frontend Developer",
        interestedArea: ["React", "JavaScript", "HTML", "CSS"],
        startDate: "01.06.2024 - 01.07.2024",
        duration: "2 hours / day"
    },
    {

        name: "John Backendguru",
        job: "Backend Developer",
        interestedArea: ["Node.js", "Express", "MongoDB", "REST"],
        startDate: "01.06.2024 - 01.08.2024",
        duration: "2 hours / day"
    },
    {

        name: "Sarah Backendguru",
        job: "Backend Developer",
        interestedArea: ["Node.js", "Express", "MongoDB", "REST"],
        startDate: "01.06.2024 - 01.09.2024",
        duration: "2 hours / day"
    },
    {

        name: "Emily Frontendguru",
        job: "Frontend Developer",
        interestedArea: ["React", "JavaScript", "HTML", "CSS"],
        startDate: "01.06.2024 - 01.10.2024",
        duration: "2 hours / day"
    },
    {

        name: "Jane Fullstacker",
        job: "Fullstack Developer",
        interestedArea: ["React", "Node.js", "Express", "MongoDB"],
        startDate: "01.06.2024 - 01.11.2024",
        duration: "2 hours / day"
    },
];

export function AssignmentTable() {
    const router = useRouter()

    const rows = data.map((item) => (
        <Table.Tr key={item.name}>

            <Table.Td>
                <ActionIcon variant="subtle" color="gray">
                    {item.star ?
                        <IconStarFilled style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                        : <IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                </ActionIcon>
            </Table.Td>

            <Table.Td>
                <Group gap="sm">
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
            </Table.Td>

            <Table.Td>
                <Group gap="xs">
                    {item.interestedArea.map((skill) => (
                        <Badge color="gray" key={skill}>{skill}</Badge>
                    ))}
                </Group>
            </Table.Td>

            <Table.Td>
                <Text fz="sm">{item.startDate}</Text>
                <Text c={"dimmed"}>{item.duration}</Text>
            </Table.Td>

            <Table.Td>
                <Button
                    leftSection={<IconExternalLink size={14} />}
                    variant="outline"
                    onClick={() => { router.push("/assignment/1") }}
                >
                    More
                </Button>
            </Table.Td>


        </Table.Tr >
    ));

    return (
        // rem370 / 650 is a possible
        <ScrollArea h={"58vh"} scrollbarSize={6}>
            <Table.ScrollContainer minWidth={800}>
                <Table verticalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th></Table.Th>
                            <Table.Th>Owner</Table.Th>
                            <Table.Th>Interested area</Table.Th>
                            <Table.Th>Timing</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </ScrollArea>
    );
}