import { selectOption } from '@/src/constants';
import { pb } from '@/src/utils/data';
import { Button, Center, Group, Loader, Modal, Select, Space } from '@mantine/core'
import { useDebouncedCallback } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import React, { useEffect, useState } from 'react'

interface AddSkillModalProps {
    opened: boolean;
    close: () => void;
    fetchUserSkills: (userId: string) => void;
    userId: string;
}

const AddSkillModal = ({ opened, close, fetchUserSkills, userId }: AddSkillModalProps) => {
    const [selectValue, setSelectValue] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestedSkills, setSuggestedSkills] = useState<any>([]);
    const [proficiencyLevel, setProficiencyLevel] = useState<string | null>("");
    const [isSearching, setIsSearching] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    // Debounce function to avoid fetching data on every key stroke
    const fetchSkills = useDebouncedCallback(async (search: string) => {
        setIsSearching(true)
        try {
            const records = await pb.collection("skills").getList(1, 20, {
                filter: `name ~ "${search}"`
            })
            const skills = records.items.map(item => ({
                value: item.id,
                label: item.name
            }));

            setSuggestedSkills(skills);
        } catch (error) {
            console.error("Error fetching records:", error);
        } finally {
            setIsSearching(false)
        }
    }, 500)

    const addSkill = async (skill_id: string) => {
        try {
            setIsUploading(true);
            const proficiencyLevelValue = (proficiencyLevel !== null) ? parseInt(proficiencyLevel) : 1;

            const data = {
                "proficiency_lvl": proficiencyLevelValue,
                "skill_id": skill_id,
                "user_id": pb.authStore.model?.id
            };
            await pb.collection('user_skill').create(data)

            // Fetch the updated list of user skills after adding a new skill
            await fetchUserSkills(userId);

            // Reset the search input and selected value
            setSearchQuery('');
            setSelectValue(null);
            setProficiencyLevel(null)

            notifications.show({ message: "Skill added successfully!", color: "green" })

        } catch (error) {
            console.error("Error adding record:", error);
            notifications.show({ message: "Skills already added to user or something went wrong", color: "red" })
        } finally {
            setIsUploading(false);
        }
    }

    // see example: https://mantine.dev/hooks/use-debounced-callback/   
    // It gets triggered when searchQuery changes
    useEffect(() => {
        if (searchQuery) {
            fetchSkills(searchQuery);
        } else {
            setSuggestedSkills([]);
        }
    }, [searchQuery, fetchSkills]);

    // Reset state when the modal is opened
    useEffect(() => {
        if (opened) {
            setSelectValue(null);
            setSearchQuery('');
            setProficiencyLevel(null);
        }
    }, [opened]);

    return (
        <Modal opened={opened} onClose={close} title="Add Skills" size={"lg"}>
            <Select
                searchable
                clearable
                placeholder="Pick value"
                nothingFoundMessage="Nothing found..."
                style={{ flex: 1, minWidth: 0 }}
                value={selectValue}
                onChange={setSelectValue}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                data={suggestedSkills}
                rightSection={isSearching && <Loader size={20} />}
            />
            <Space h={"lg"} />

            <Select
                placeholder="Select proficiency level"
                value={proficiencyLevel}
                onChange={setProficiencyLevel}
                data={selectOption}
            />
            <Space h={"lg"} />

            <Center>
                <Group>
                    <Button
                        variant="outline"
                        loading={isUploading}
                        onClick={() => { addSkill(selectValue) }}
                    >
                        Save
                    </Button>
                </Group>
            </Center>
        </Modal>
    )
}

export default AddSkillModal