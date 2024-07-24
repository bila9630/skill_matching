import React, { ReactElement, useEffect, useState } from 'react'
import Rootlayout from '../../components/layout/Rootlayout'
import { Grid, Space } from '@mantine/core'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { useRouter } from 'next/router'
import UserInfo from '@/src/components/profile/userInfo/UserInfo'
import CertificationCard from '@/src/components/profile/certificationCard/certificationCard'
import UserSkillSection from '@/src/components/profile/userSkillSection/UserSkillSection'

const Profile = () => {
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
        <div>
            <Space h="sm" />
            <Breadcrumb items={[{ title: "Profile", href: `/profile/${userId}` }]} />
            <Space h="sm" />

            <Grid>
                <Grid.Col span={8}>
                    {/* Contains user description also */}
                    <UserInfo />
                    <Space h="xs" />

                    {/* Skills card */}
                    <UserSkillSection />
                    <Space h="xs" />
                </Grid.Col>

                <Grid.Col span={4}>
                    <CertificationCard />
                </Grid.Col>
            </Grid>
            <Space h="lg" />
        </div>
    )
}

Profile.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default Profile