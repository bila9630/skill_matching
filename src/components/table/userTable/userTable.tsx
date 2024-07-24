import { POCKETBASE_URL } from "@/src/constants";
import { pb } from "@/src/utils/data";
import { Avatar, Table, Group, Text, ActionIcon, rem, Badge, ScrollArea, Button, Anchor, Skeleton, Box, Tooltip } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
    IconExternalLink,
    IconStar
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// collectionId is required for url_path to display avatar
interface Talent {
    collectionId: string;
    id: string;
    avatar: string;
    job_role: string;
    location: string;
    name: string;
    skills: string[];
}

export function UserTable() {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true);
    const [talents, setTalents] = useState<Talent[]>([])

    useEffect(() => {
        fetchTalents();
    }, []);

    const fetchTalents = async () => {
        try {
            setLoading(true)
            const records = await pb.collection('talent_table_view').getList(1, 50);
            console.log("resultList", records)

            const talentList = records.items.map((item: any) => ({
                collectionId: item.collectionId,
                id: item.id,
                avatar: item.avatar,
                job_role: item.job_role,
                location: item.location,
                name: item.name,
                // split "skill1, skill2, skill3" into ["skill1", "skill2", "skill3"]
                skills: item.skills ? item.skills.split(',').map((skill: string) => skill.trim()) : []
            }));
            setTalents(talentList)

        } catch (error: any) {
            setLoading(false)
            notifications.show({ message: "Failed to fetch data! Try again later!", color: "red" })
        } finally {
            setLoading(false)
        }
    }

    const rows = talents.map((talent) => (
        <Table.Tr key={talent.id}>
            <Table.Td>
                <ActionIcon variant="subtle" color="gray">
                    <IconStar style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
                </ActionIcon>
            </Table.Td>

            <Table.Td w={"18rem"}>
                <Group gap="sm">
                    <Avatar
                        size={40}
                        name={talent.name}
                        src={`${POCKETBASE_URL}/api/files/${talent.collectionId}/${talent.id}/${talent.avatar}`}
                        radius={40}
                        alt={talent.name}
                    />
                    <div>
                        <Text fz="sm" fw={500}>
                            <Anchor component={Link} href={`/profile/${talent.id}`} size="sm" underline="hover" c={"gray"}>
                                {talent.name}
                            </Anchor>
                        </Text>
                        <Box w={"12rem"}>
                            <Text c="dimmed" fz="xs" truncate="end">
                                {talent.job_role}
                            </Text>
                        </Box>
                    </div>
                </Group>
            </Table.Td>

            <Table.Td>
                <Badge variant="light">
                    Active
                </Badge>
            </Table.Td>

            <Table.Td>
                <Group gap="xs">
                    {talent.skills.map((skill) => (
                        <Badge color="gray" key={skill}>{skill}</Badge>
                    ))}
                </Group>
            </Table.Td>

            <Table.Td w={"10rem"}>
                <>
                    <Text fz="sm">{talent.location || '-'}</Text>
                    <Text c="dimmed" fz="xs">
                        Location
                    </Text>
                </>
            </Table.Td>

            <Table.Td w={"8rem"}>
                <Button
                    leftSection={<IconExternalLink size={14} />}
                    variant="outline"
                    onClick={() => { router.push(`/profile/${talent.id}`) }}
                >
                    More
                </Button>
            </Table.Td>


        </Table.Tr >
    ));

    return (
        // rem370 / 650 is a possible
        <ScrollArea h={"70vh"} scrollbarSize={6}>
            {loading ?
                <Skeleton height={"65vh"} mt={"md"} /> :
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="md" >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th></Table.Th>
                                <Table.Th>Person</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Skills</Table.Th>
                                <Table.Th>Location</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            }
        </ScrollArea>
    );
}