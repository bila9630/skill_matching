import cx from "clsx";
import { ActionIcon, Group, useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { IconMoon, IconSun } from "@tabler/icons-react";
import React from "react"
import classes from "./colorToggle.module.css";

const ColorToggle = () => {
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

    return (
        <Group>
            <ActionIcon
                onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")}
                variant="outline"
                color={computedColorScheme === "light" ? "blue" : "yellow"}
                size="lg"
                aria-label="Toggle color scheme"
            >
                <IconSun className={cx(classes.icon, classes.light)} stroke={1.2} />
                <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.2} />
            </ActionIcon>
        </Group>
    )
}

export default ColorToggle