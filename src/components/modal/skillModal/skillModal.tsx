import { selectOption } from '@/src/constants';
import { pb } from '@/src/utils/data';
import { UserSkill } from '@/src/utils/interfaces';
import { ActionIcon, Button, Center, Group, Loader, Modal, Select, Space, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import React, { useState } from 'react'

interface SkillModalProps {
    opened: boolean;
    close: () => void;
    userSkills: UserSkill[];
    setUserSkills: React.Dispatch<React.SetStateAction<UserSkill[]>>;
}

const SkillModal = ({ opened, close, userSkills, setUserSkills }: SkillModalProps) => {
    const [loadingSkills, setLoadingSkills] = useState<string[]>([]);
    // State to disable delete buttons, prevent user from clicking multiple times
    // { "id": true } indicates the delete button is disabled for that skill.
    // The list starts empty, adding IDs when buttons are disabled.
    // We DO NOT track enabled IDs and set all IDs to false initially.
    const [deletingSkills, setDeletingSkills] = useState<{ [key: string]: boolean }>({});

    const deleteUserSkill = async (id: string) => {
        setDeletingSkills(prev => ({ ...prev, [id]: true }));
        try {
            // result returns true
            const result = await pb.collection("user_skill").delete(id)
            // console.log(result)
            notifications.show({ message: "Skill deleted successfully!", color: "green" })

            // Update the local state to remove the deleted skill
            setUserSkills(prevSkills => prevSkills.filter(skill => skill.id !== id));

        } catch (error) {
            console.error("Error deleting record:", error);
            notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
        } finally {
            setDeletingSkills(prev => ({ ...prev, [id]: false }));
        }
    }

    const updateLvlSkill = async (option: any, userSkillId: string) => {
        setLoadingSkills(prevLoading => [...prevLoading, userSkillId]);
        try {
            // option looks like { value: "1", label: "1 - Entry" }
            // userSkillId is the id of the row in user_skill table
            // console.log("updateLvlSkill", option, userSkillId)

            const data = { "proficiency_lvl": parseInt(option.value) };

            await pb.collection("user_skill").update(userSkillId, data)

            // Update the local state directly
            setUserSkills(prevSkills =>
                prevSkills.map(skill =>
                    skill.id === userSkillId ? { ...skill, lvl: parseInt(option.value) } : skill
                )
            );

            notifications.show({ message: "Skill proficiency level updated successfully!", color: "green" })
        } catch (error) {
            console.error("Error updating record:", error);
            notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
        } finally {
            setLoadingSkills(prevLoading => prevLoading.filter(id => id !== userSkillId)); // Remove skill id from loading array
        }
    }

    return (
        <Modal opened={opened} onClose={close} title="Edit Skills" size={"xl"}>
            {userSkills.length === 0 ? (
                <Center>
                    <Text c={"dimmed"}>No skills provided</Text>
                </Center>
            ) : (
                userSkills.map((userSkill: UserSkill) => (
                    <Group mt={"lg"} justify="space-between" key={userSkill.id}>
                        <Text truncate="end" style={{ maxWidth: '60%' }}>{userSkill.name}</Text>
                        <Group>
                            <Select
                                data={selectOption}
                                value={userSkill.lvl.toString()}
                                // option looks like { value: "1", label: "1 - Entry" }
                                onChange={(_value, option) => updateLvlSkill(option, userSkill.id)}
                                rightSection={loadingSkills.includes(userSkill.id) && <Loader size={20} />}
                            />
                            <ActionIcon variant="subtle" color="red"
                                onClick={() => { deleteUserSkill(userSkill.id) }}
                                disabled={deletingSkills[userSkill.id]}
                            >
                                <IconTrash style={{ width: "70%", height: '70%' }} stroke={1.5} />
                            </ActionIcon>
                        </Group>
                    </Group>
                )))
            }

            <Space h={"lg"} />

            <Center>
                <Group>
                    <Button variant="outline" onClick={close}>Done</Button>
                </Group>
            </Center>
        </Modal>
    )
}

export default SkillModal

