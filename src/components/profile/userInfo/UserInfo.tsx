import { ActionIcon, Avatar, Badge, Button, Card, Center, Group, Skeleton, Space, Text, Title } from '@mantine/core'
import { IconBrandSlack, IconEdit, IconExternalLink, IconFile, IconMail, } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'
import StarToggle from '../../starToggle/StarToggle';
import { useDisclosure } from '@mantine/hooks';
import ProfileModal from '../../modal/profileModal/profileModal';
import { useRouter } from 'next/router';
import { pb } from '@/src/utils/data';
import { POCKETBASE_URL } from '@/src/constants';
import { notifications } from '@mantine/notifications';

interface BadgeDisplayProps {
    emoji: string;
    label: string;
}

const BadgeDisplay = ({ emoji, label }: BadgeDisplayProps) => (
    <Badge variant="light" leftSection={emoji}>
        {label}
    </Badge>
);

export interface UserInfoProps {
    collectionId: string;
    collectionName: string;
    user_info_id?: string;
    name: string;
    email: string;
    id: string;
    avatar?: string;
    description?: string;
    job_role?: string;
    linkedin_url?: string;
    location?: string;
    resume?: string;
    slack_id?: string;
    year_exp?: number;
}

const UserInfo = () => {
    const [profileIsOpen, { open: openProfile, close: closeProfile }] = useDisclosure(false);
    const [userId, setUserId] = useState<string>("");

    const router = useRouter()
    const [userInfo, setUserInfo] = useState<UserInfoProps>({
        collectionId: "",
        collectionName: "",
        id: "",
        name: "",
        email: "",
    })

    const [loading, setLoading] = useState<boolean>(true);

    const openCV = () => {
        if (!userInfo.collectionId || !userInfo.id || !userInfo.resume) {
            notifications.show({ message: "Something went wrong! Try again later!", color: "red" })
        } else {
            const cv_url = `${POCKETBASE_URL}/api/files/${userInfo.collectionId}/${userInfo.id}/${userInfo.resume}`
            window.open(cv_url, '_blank')
        }
    }


    useEffect(() => {
        const fetchUserData = async () => {
            if (router.isReady) {
                const { id } = router.query;
                if (id) {
                    try {
                        const OneUserId = Array.isArray(id) ? id[0] : id;
                        setUserId(OneUserId);
                        await fetchUserInfo(OneUserId);
                    } catch (error) {
                        setLoading(false)
                        notifications.show({ message: "Failed to fetch data! Try again later!", color: "red" })
                    }
                }
            }
        }

        fetchUserData();
    }, [router.isReady, router.query.id, router.query]);

    const fetchUserInfo = async (userId: string) => {
        const record = await pb.collection("user_full_info").getOne(userId);
        const userData: UserInfoProps = {
            avatar: record.avatar,
            collectionId: record.collectionId,
            collectionName: record.collectionName,
            user_info_id: record.user_info_id,
            description: record.description,
            email: record.email,
            id: record.id,
            job_role: record.job_role,
            linkedin_url: record.linkedin_url,
            location: record.location,
            name: record.name,
            resume: record.resume,
            slack_id: record.slack_id,
            year_exp: record.year_exp,
        };
        setUserInfo(userData);
        setLoading(false)
    }

    return (
        <>
            <Card withBorder radius="md" p="lg" >
                {/* Avatar and edit button */}
                <Group justify="space-between" align="flex-start">
                    {loading ?
                        <Skeleton height={140} circle /> :
                        <Avatar
                            size={140} alt={userInfo.name}
                            name={userInfo.name} color="blue"
                            src={`${POCKETBASE_URL}/api/files/${userInfo.collectionId}/${userInfo.id}/${userInfo.avatar}`}
                        />
                    }
                    {/* display edit buttons only on personal profile */}
                    {userId == pb.authStore.model?.id &&
                        <ActionIcon variant="subtle" color="gray" onClick={openProfile}>
                            <IconEdit />
                        </ActionIcon>
                    }
                </Group>
                <Space h="lg" />

                <Group justify={"space-between"}>
                    <div>
                        {loading ?
                            <Skeleton height={50} width={200} /> :
                            <>
                                <Title order={2}>{userInfo.name}</Title>
                                <Text>{userInfo.job_role}</Text>
                            </>
                        }
                    </div>
                    {/* Favorite Icon */}
                    {userId != pb.authStore.model?.id &&
                        <StarToggle />
                    }
                </Group>
                <Space h="xs" />

                {/* Badges */}
                <Group gap={7} mt={5}>
                    {loading ?
                        <Skeleton height={70} width={800} /> :
                        <>
                            {userInfo.year_exp && <BadgeDisplay emoji="📚" label={`${userInfo.year_exp} years of experience`} />}
                            {userInfo.location && <BadgeDisplay emoji="📍" label={userInfo.location} />}
                        </>
                    }
                </Group>
                <Space h="lg" />

                {/* CV, Linkedin, Email and Slack button */}
                <Group>
                    {userInfo.resume &&
                        <Button
                            leftSection={<IconFile size={14} />} variant="outline"
                            onClick={() => { openCV() }}
                        >
                            One Pager
                        </Button>}
                    {userInfo.linkedin_url &&
                        <Button
                            leftSection={<IconExternalLink size={14} />} variant="outline"
                            onClick={() => window.open(userInfo.linkedin_url, "_blank")}
                        >
                            LinkedIn
                        </Button>}
                    {userInfo.email && <Button leftSection={<IconMail size={14} />} variant="outline">Email: {userInfo.email}</Button>}
                    {userInfo.slack_id && <Button leftSection={<IconBrandSlack size={14} />} variant="outline">Slack: {userInfo.slack_id}</Button>}
                </Group>
            </Card>
            <Space h="xs" />

            {/* Description Card */}
            <Card withBorder radius="md" p="lg">
                <Text fw={"bold"}>Info</Text>
                {
                    loading ?
                        <Skeleton mt={"md"} height={120} /> :
                        userInfo.description ?
                            // pre-wrap is used to maintain the line breaks in the description 
                            <Text style={{ whiteSpace: 'pre-wrap' }}>{userInfo.description}</Text> :
                            <Center>
                                <Text c={"dimmed"}>No description provided</Text>
                            </Center>

                }
            </Card>

            <ProfileModal
                opened={profileIsOpen} close={closeProfile}
                userInfo={userInfo} fetchUserInfo={fetchUserInfo}
                userId={userId} setLoading={setLoading}
            />
        </>
    )
}

export default UserInfo