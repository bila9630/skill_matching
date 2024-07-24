import PocketBase from 'pocketbase';
import { POCKETBASE_URL } from '../constants';
import { notifications } from '@mantine/notifications';
import { UserSkill } from './interfaces';

export const pb = new PocketBase(POCKETBASE_URL);

export async function fetchSkillsFromUser(userId: string) {
    try {
        const records = await pb.collection('user_skill_view').getFullList({
            filter: pb.filter("user_id={:id}", { id: userId })
        })
        // Map through the result and extract name and proficiency_lvl
        let fetchedSkills: UserSkill[] = records.map((record: any) => ({
            id: record.id,
            name: record.name,
            lvl: record.proficiency_lvl
        }));

        // Sort the skills array by proficiency level in descending order
        fetchedSkills = fetchedSkills.sort((a, b) => b.lvl - a.lvl);

        return (fetchedSkills);

    } catch (error) {
        console.error("Error fetching records:", error);
        notifications.show({ message: "Something went wrong! Please try again later!", color: "red" })
    }
}