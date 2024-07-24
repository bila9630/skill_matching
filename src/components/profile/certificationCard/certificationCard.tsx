import { pb } from '@/src/utils/data'
import { ActionIcon, Button, Card, Grid, Group, Skeleton, Space, Text } from '@mantine/core'
import { IconEdit, IconExternalLink, IconPlus } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const CertificationCard = () => {
    const router = useRouter()
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        if (router.isReady) {
            const { id } = router.query;
            if (id) {
                setUserId(Array.isArray(id) ? id[0] : id); // Ensure id is a single string
            }
        }

    }, [router.isReady, router.query.id, router.query]);

    return (
        <>
            <Card withBorder radius="md" p="lg">
                <Group justify="space-between">
                    <Text fw={"bold"}>Certificates</Text>
                    {userId == pb.authStore.model?.id &&
                        <Group>
                            <ActionIcon variant="subtle" color="gray" onClick={() => { console.log("hello world") }}>
                                <IconPlus />
                            </ActionIcon>

                            <ActionIcon variant="subtle" color="gray" onClick={() => { console.log("hello world") }}>
                                <IconEdit />
                            </ActionIcon>
                        </Group>
                    }
                </Group>
                <Space h="lg" />
                <Grid>
                    <Grid.Col span={4}>
                        <Skeleton height={120} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text>AWS Solutions Architect Associate</Text>
                        <Text size="sm">Amazon Web Services (AWS)</Text>
                        <Text size="sm" c={"dimmed"}>Issued Nov. 2024 | Expires Dec. 2027</Text>
                        <Button
                            mt={"xs"} variant="outline" color="gray"
                            rightSection={<IconExternalLink size={14} />}
                            onClick={() => { window.open('CREDLY_PAGE_HERE', '_blank'); }}
                        >
                            Show Credential
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Skeleton height={120} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text>Certified SAFe 6 Agilist</Text>
                        <Text size="sm">Scaled Agile, Inc.</Text>
                        <Text size="sm" c={"dimmed"}>Issued Apr. 2024 | Expires Apr. 2025</Text>
                        <Button
                            mt={"xs"} variant="outline" color="gray"
                            rightSection={<IconExternalLink size={14} />}
                            onClick={() => { window.open('CREDLY_PAGE_HERE', '_blank'); }}
                        >
                            Show Credential
                        </Button>
                    </Grid.Col>

                    <Grid.Col span={4}>
                        <Skeleton height={120} radius="md" animate={false} />
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Text>Professional Scrum Master™ I (PSM I)</Text>
                        <Text size="sm">Scrum.org</Text>
                        <Text size="sm" c={"dimmed"}>Issued Nov. 2022</Text>
                        <Button
                            mt={"xs"} variant="outline" color="gray"
                            rightSection={<IconExternalLink size={14} />}
                            onClick={() => { window.open('CREDLY_PAGE_HERE', '_blank'); }}
                        >
                            Show Credential
                        </Button>
                    </Grid.Col>

                </Grid>
            </Card>
            <Space h="md" />
        </>
    )
}

export default CertificationCard