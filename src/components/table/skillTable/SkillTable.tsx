import { UserSkill } from "@/src/utils/interfaces";
import { Table, Text, ScrollArea } from "@mantine/core";


const getProficiencyText = (lvl: number): string => {
    switch (lvl) {
        case 0:
            return "0";
        case 1:
            return "1";
        case 2:
            return "2";
        case 3:
            return "3";
        case 4:
            return "4";
        case 5:
            return "5";
        default:
            return "unknown";
    }
};

interface SkillTableProps {
    userSkills: UserSkill[];
}


export function SkillTable({ userSkills }: SkillTableProps) {
    const rows = userSkills.map((skill: UserSkill) => (
        <Table.Tr key={skill.id}>
            <Table.Td>
                <Text>{skill.name}</Text>
            </Table.Td>
            <Table.Td>
                <Text fz="sm">{getProficiencyText(skill.lvl)}</Text>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            {/* rem370 / 650 is a possible */}
            <ScrollArea h={300} scrollbarSize={6}>
                <Table.ScrollContainer minWidth={800}>
                    <Table verticalSpacing="md">
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </ScrollArea>
        </>
    );
}