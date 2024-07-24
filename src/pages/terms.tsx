import { Container, List, Space, Text, Title } from '@mantine/core'
import React from 'react'

const Terms = () => {
    return (
        <Container>
            <div>
                <Title order={1} mt={40} c="white">Terms of use</Title>
            </div>
            <div>
                <Text>We keep your private information private.</Text>
            </div>

            <Space h="xl" />
            <div>
                <Text>Lorem Ipsum</Text>
            </div>
        </Container>
    )
}

export default Terms