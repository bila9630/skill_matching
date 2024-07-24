import { ActionIcon, Card, Center, Group, Skeleton, Space, Text } from '@mantine/core'
import { IconEdit, IconPlus } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import { SkillTable } from '../../table/skillTable/SkillTable'
import { useDisclosure } from '@mantine/hooks'
import AddSkillModal from '../../modal/addSkillModal/addSkillModal'
import SkillModal from '../../modal/skillModal/skillModal'
import { UserSkill } from '@/src/utils/interfaces'
import { notifications } from '@mantine/notifications'
import { fetchSkillsFromUser, pb } from '@/src/utils/data'
import { useRouter } from 'next/router'

const UserSkillSection = () => {
    const [skillIsOpen, { open: openSkill, close: closeSkill }] = useDisclosure(false);
    const [addSkillIsOpen, { open: openAddSkill, close: closeAddSkill }] = useDisclosure(false);

    const router = useRouter()
    const [userSkills, setUserSkills] = useState<UserSkill[]>([]);

    const [userId, setUserId] = useState<string>("");

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchUserData = async () => {
            if (router.isReady) {
                const { id } = router.query;
                if (id) {
                    const OneUserId = Array.isArray(id) ? id[0] : id;
                    setUserId(OneUserId); // Ensure id is a single string
                    await fetchUserSkills(OneUserId);
                }
            }
        };

        fetchUserData();
    }, [router.isReady, router.query.id, router.query]);

    const fetchUserSkills = async (userId: string) => {
        if (!userId) {
            notifications.show({ message: "UserId is not available", color: "red" });
            return;
        }

        // exp: [{ id: "1", skill: "React", level: 3}, ...]
        const fetchedSkills = await fetchSkillsFromUser(userId);
        setUserSkills(fetchedSkills || []);
        setLoading(false)
    }

    return (
        <>
            <Card withBorder radius="md" p="lg">
                <Group justify="space-between">
                    <Text fw={"bold"}>Skills</Text>
                    {userId == pb.authStore.model?.id &&
                        <Group>
                            <ActionIcon variant="subtle" color="gray" onClick={openAddSkill}>
                                <IconPlus />
                            </ActionIcon>

                            <ActionIcon variant="subtle" color="gray" onClick={openSkill}>
                                <IconEdit />
                            </ActionIcon>
                        </Group>
                    }
                </Group>
                <Space h="md" />
                {loading ?
                    <Skeleton height={250} /> :
                    <>
                        {userSkills.length === 0 ?
                            <Center>
                                <Text c={"dimmed"}>No skills provided</Text>
                            </Center>
                            :
                            <SkillTable userSkills={userSkills} />
                        }
                    </>
                }

                <AddSkillModal opened={addSkillIsOpen} close={closeAddSkill} fetchUserSkills={fetchUserSkills} userId={userId} />
                <SkillModal opened={skillIsOpen} close={closeSkill} userSkills={userSkills} setUserSkills={setUserSkills} />
            </Card>
        </>
    )
}

export default UserSkillSection