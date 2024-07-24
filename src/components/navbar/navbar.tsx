import { Center, Tooltip, UnstyledButton, Stack, rem, ActionIcon } from '@mantine/core';
import {
    IconHome2,
    IconUsers,
    IconUser,
    IconSettings,
    IconCompass,
    IconTopologyStarRing,
} from '@tabler/icons-react';
import classes from './navbar.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { pb } from '@/src/utils/data';
import { useEffect, useState } from 'react';


interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    href?: string;
}

function NavbarLink({ icon: Icon, label, active, href = "/home" }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton component={Link} href={href} className={classes.link} data-active={active || undefined}>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const topNavigation = [
    { icon: IconHome2, href: '/home', label: 'Home' },
    { icon: IconCompass, href: '/posting', label: 'Posting' },
    { icon: IconUsers, href: '/talent', label: 'Talent' },
];

export default function Navbar() {
    // pathname looks like /home, /posting, etc.
    let { pathname } = useRouter();
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        // Load userId on client side
        const id = pb.authStore.model?.id;
        setUserId(id);
    }, []);

    if (pathname === '/profile/[id]') {
        pathname = `/profile/${userId}`;
    }

    const bottomNavigation = [
        { icon: IconUser, href: `/profile/${userId}`, label: 'Profile' },
        { icon: IconSettings, href: '/setting', label: 'Setting' },
    ];


    // renderNavbarLinks is a function that takes an array of NavigationLink
    // and returns an array of Button components
    const renderNavbarLinks = (navigationLinks: NavbarLinkProps[]) => (
        navigationLinks.map((link, index) => (
            <NavbarLink
                {...link}
                key={link.label || link.href} // Using href as a fallback key
                active={pathname === link.href}
                href={link.href}
            />
        ))
    );

    return (
        <nav className={classes.navbar}>
            <Center>
                <ActionIcon component={Link} href={"/home"} variant="transparent" size={45} color='dimmed'>
                    <IconTopologyStarRing size={45} stroke={1.5} />
                </ActionIcon>
            </Center>

            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {renderNavbarLinks(topNavigation)}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                {renderNavbarLinks(bottomNavigation)}
            </Stack>

        </nav>
    );
}