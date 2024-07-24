import { Table, Group, Text, ActionIcon, rem, Badge, ScrollArea, Button, Anchor } from "@mantine/core";
import {
    IconExternalLink,
    IconStar,
    IconStarFilled
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";

const data = [
    {
        name: "Sustainability Management - Advanced Accounting",
        startDate: "01.06.2024 - 01.11.2024",
        duration: "2 hours / week",
        contactPerson: "Doja Cat",
        skills: ["Angular", "React", "Vue", "Mainframe"],
        star: true,
    },
    {
        name: "Code Migration to AWS",
        startDate: "15.03.2025 - Open",
        duration: "5 hours / week",
        contactPerson: "John Doe",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        star: false,
    },
    {
        name: "Create the next generation Chatbot!",
        startDate: "01.04.2025",
        duration: "2 hours / day",
        contactPerson: "Jane Smith",
        skills: ["Python", "R", "Machine Learning"],
        star: true,
    },
    {
        name: "Mobile App Development for a telecommunication customer",
        startDate: "15.05.2025",
        duration: "2 hours / day",
        contactPerson: "Alex Johnson",
        skills: ["Java", "Kotlin", "Swift"],
    },
    {
        name: "Data Analysis for Marketing Campaign",
        startDate: "01.07.2025",
        duration: "2 hours / day",
        contactPerson: "Sarah Johnson",
        skills: ["SQL", "Python", "Tableau"],
        star: false,
    },
    {
        name: "Frontend Development for E-commerce Website",
        startDate: "15.08.2025",
        duration: "4 months",
        contactPerson: "Michael Smith",
        skills: ["HTML", "CSS", "JavaScript", "React"],
        star: true,
    },
    {
        name: "Backend API Development for Mobile App",
        startDate: "01.09.2025",
        duration: "6 months",
        contactPerson: "Emily Davis",
        skills: ["Node.js", "Express", "MongoDB"],
        star: false,
    },

];

export function ProjectTable() {
    const router = useRouter()

    const rows = data.map((item) => (
        <Table.Tr key={item.name}>
            <Table.Td>
                <Group gap={0} justify="flex-end">
                    <ActionIcon variant="subtle" color="gray">
                        {item.star ?
                            <IconStarFilled style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                            : <IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    </ActionIcon>
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm" fw={500}>
                    <Anchor component={Link} href="/project/1" size="sm" underline="hover" c={"gray"}>
                        {item.name}
                    </Anchor>
                </Text>
            </Table.Td>
            <Table.Td>
                <Group gap="xs">
                    {item.skills.map((skill) => (
                        <Badge color="gray" key={skill}>{skill}</Badge>
                    ))}
                </Group>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.startDate}</Text>
                <Text fz="xs" c={"dimmed"}>
                    {item.duration}
                </Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{item.contactPerson}</Text>
            </Table.Td>

            <Table.Td>
                <Button
                    leftSection={<IconExternalLink size={14} />}
                    variant="outline"
                    onClick={() => { router.push("/project/1") }}
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
                            <Table.Th>Title</Table.Th>
                            <Table.Th>Skills</Table.Th>
                            <Table.Th>Timing</Table.Th>
                            <Table.Th>Owner</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </ScrollArea>
    );
}