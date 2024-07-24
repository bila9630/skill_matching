import { Button, Menu, rem, useMantineTheme } from '@mantine/core';
import {
    IconSquareCheck,
    IconPackage,
    IconChevronDown,
} from '@tabler/icons-react';
import { useRouter } from 'next/router';

export function ButtonMenu() {
    const theme = useMantineTheme();
    const router = useRouter();

    return (
        <Menu
            transitionProps={{ transition: 'pop-top-right' }}
            position="top-end"
            width={220}
            withinPortal
        >
            <Menu.Target>
                <Button
                    rightSection={
                        <IconChevronDown style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    }
                    pr={12}
                >
                    Create new
                </Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item
                    leftSection={
                        <IconPackage
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.blue[6]}
                            stroke={1.5}
                        />
                    }
                    onClick={() => { router.push("/createProject") }}
                >
                    Project
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <IconSquareCheck
                            style={{ width: rem(16), height: rem(16) }}
                            color={theme.colors.pink[6]}
                            stroke={1.5}
                        />
                    }
                    onClick={() => { router.push("/createAssignment") }}
                >
                    Stretch assignment
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}