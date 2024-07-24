import { pb } from '@/src/utils/data';
import { TagsInput } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'

const InputSkill = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);

    const fetchSkills = useDebouncedCallback(async (search: string) => {
        console.log(search)
        try {
            const resultList = await pb.collection('skills').getList(1, 20, {
                filter: `name ~ "${search}"`
            })
            const names = resultList.items.map(item => item.name);
            setSuggestedSkills(names);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    }, 500)

    useEffect(() => {
        if (searchQuery) {
            fetchSkills(searchQuery);
        } else {
            setSuggestedSkills([]);
        }
    }, [searchQuery, fetchSkills]);

    return (
        <div>
            <TagsInput
                label="Skills"
                placeholder="Pick skills"
                data={suggestedSkills}
                clearable
                onInput={(e: any) => { setSearchQuery(e.target.value) }}
            />
        </div>
    )
}

export default InputSkill