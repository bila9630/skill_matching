import React from "react"
import { Breadcrumbs, Anchor } from "@mantine/core";
import { useRouter } from "next/router";

interface BreadcrumbItem {
    title: string;
    href: string;
}

interface BreadcrumbProps {
    items?: BreadcrumbItem[];
}

// Transform /talent to Talent
const pathToTitle = (path: string): string => {
    // /talent => T + alent
    return path.charAt(1).toUpperCase() + path.slice(2);
};

// example for items: [{ title: "Talent", href: "/talent" }]
const Breadcrumb = ({ items }: BreadcrumbProps) => {
    const router = useRouter();

    if (!items) {
        // Transform /talent/page to ["talent", "page"]
        // .filter((path) => path) removes empty strings
        const paths = router.pathname.split('/').filter((path) => path);

        // href => ["talent", "page"] => /talent/page
        items = paths.map((path, index) => ({
            title: pathToTitle(`/${path}`),
            href: `/${paths.slice(0, index + 1).join('/')}`
        }));
    }

    const anchors = items.map((item, index) => (
        <Anchor href={item.href} key={index} c={"dimmed"}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs separator="/" separatorMargin="sm" mt={10} mb={15}>
                {anchors}
            </Breadcrumbs>
        </>
    );
};

export default Breadcrumb;