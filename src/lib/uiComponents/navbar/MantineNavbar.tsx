import { Code, Group, ScrollArea } from "@mantine/core";
import { IconFocusAuto } from "@tabler/icons-react";
import { ROUTE } from "../../../app/routes/constants";
import { Logo } from "../Logo";
import { LogoutButton } from "./LogoutButton";
import { LinksGroup, type LinksGroupProps } from "./MantineLinksGroup";
import classes from "./NavbarNested.module.css";

// Admin Panel
export const adminPanelItem: LinksGroupProps[] = [
    {
        label: "Admin",
        icon: IconFocusAuto,
        links: [
            { label: "Roles and Users", link: ROUTE.ADMIN.ROLE_USERS },
            { label: "Menu Items", link: ROUTE.ADMIN.MENU_ITEMS },
            { label: "Orders", link: ROUTE.ADMIN.ORDERS },
            { label: "Templates", link: ROUTE.ADMIN.TEMPLATE },
            { label: "Labels", link: ROUTE.ADMIN.LABEL },
            { label: "Inv Areas", link: ROUTE.ADMIN.INVENTORY_AREAS },
            { label: "Inv Items", link: ROUTE.ADMIN.INVENTORY_ITEMS },
            { label: "Units of Measure", link: ROUTE.ADMIN.UNIT_OF_MEASURE },
            { label: "Recipes", link: ROUTE.ADMIN.RECIPE },
        ],
    },
];
// Order Management

// Inventory Management

// Recipe Costing

interface NavbarNestedProps {
    items: LinksGroupProps[];
}

export function NavbarNested({ items }: NavbarNestedProps) {
    const links = items.map((item) => (
        <LinksGroup {...item} key={item.label} />
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Logo size={120} radius={120} />
                    <Code fw={700}>v0.0.1</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <LogoutButton />
            </div>
        </nav>
    );
}
