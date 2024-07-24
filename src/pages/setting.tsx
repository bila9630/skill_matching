import Rootlayout from '@/src/components/layout/Rootlayout'
import { Space, Title } from '@mantine/core'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'
import Breadcrumb from '../components/breadcrumb/Breadcrumb'
import { SettingCard } from '../components/settingCard/SettingCard'
import { NextPageWithLayout } from './_app'

const Setting: NextPageWithLayout = () => {

    return (
        <div>
            <Space h="sm" />
            <Breadcrumb />
            <Title order={3}>Setting</Title>
            <Space h="md" />

            <SettingCard />
            <Space h="md" />
        </div >
    )
}

Setting.getLayout = (page: ReactElement) => {
    return (<Rootlayout>{page}</Rootlayout>)
}

export default Setting