import { ActionIcon, rem } from '@mantine/core';
import { IconStar, IconStarFilled } from '@tabler/icons-react';
import React, { useState } from 'react'

const StarToggle = () => {
    const [filled, setFilled] = useState(false);

    const handleToggle = () => {
        setFilled(prev => !prev);
    };

    return (
        <ActionIcon variant="subtle" color="gray" onClick={handleToggle}>
            {filled ? (
                <IconStarFilled style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
            ) : (
                <IconStar style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
            )}
        </ActionIcon>
    )
}

export default StarToggle