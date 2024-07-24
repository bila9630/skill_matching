import React, { ReactElement } from "react"
import Rootlayout from "@/src/components/layout/Rootlayout"
import { Card, Grid, Skeleton, Space, Text, Title } from "@mantine/core"
import Breadcrumb from "../components/breadcrumb/Breadcrumb"
import PersonalArea from "../components/personalArea/personalArea"

const Home = () => {

  return (
    <div>
      <Space h="sm" />
      <Breadcrumb />

      {/* Title */}
      <Title order={3}>Home</Title>
      <Space h="md" />

      <Grid>
        <Grid.Col span={8}>
          <Card withBorder radius="md" p="lg">
            <Text fw={"bold"}>Statistics</Text>
            <Space h="lg" />

            <Space h="xs" />
            <Skeleton height={"67vh"} radius="md" animate={false} />
          </Card>
        </Grid.Col>

        <Grid.Col span={4}>
          <PersonalArea />
        </Grid.Col>

      </Grid>



    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return (<Rootlayout>{page}</Rootlayout>)
}

export default Home