import { Code, Group, ScrollArea } from "@mantine/core";
import {
    IconBuildingWarehouse,
    IconChefHat,
    IconFocusAuto,
    IconShoppingCart,
} from "@tabler/icons-react";
import { FeatureNavbarItemMap } from "../../../app/constants";
import { ROUTE } from "../../../app/routes/constants";
import { getAuthorizedUserFeatures } from "../../auth";
import { Logo } from "../Logo";
import { LogoutButton } from "./LogoutButton";
import { LinksGroup, type LinksGroupProps } from "./MantineLinksGroup";
import classes from "./NavbarNested.module.css";

// Admin Panel
export const adminPanelItem: LinksGroupProps = {
    label: "Admin",
    icon: IconFocusAuto,
    initiallyOpened: false,
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
};
// Order Management
export const orderManagementItem: LinksGroupProps = {
    label: "Order Management",
    icon: IconShoppingCart,
    initiallyOpened: false,
    links: [
        { label: "Orders", link: ROUTE.ORDER.ROOT },
        { label: "Templates", link: ROUTE.ORDER.TEMPLATES },
        { label: "Labels", link: ROUTE.ORDER.LABELS },
        { label: "Reports", link: ROUTE.ORDER.REPORTS },
    ],
};

// Inventory Management
export const inventoryManagementItem: LinksGroupProps = {
    label: "Inventory Management",
    icon: IconBuildingWarehouse,
    initiallyOpened: false,
    links: [
        { label: "Areas", link: ROUTE.INVENTORY.ROOT },
        { label: "Counts", link: ROUTE.INVENTORY.COUNTS },
        { label: "Items", link: ROUTE.INVENTORY.ITEMS },
    ],
};
// Recipe Costing
export const recipeCostingItem: LinksGroupProps = {
    label: "Recipe Costing",
    icon: IconChefHat,
    initiallyOpened: false,
};

export function getAuthorizedUserFeatureLinksGroupProps(): LinksGroupProps[] {
    return getAuthorizedUserFeatures()
        .map((feature) => FeatureNavbarItemMap[feature])
        .filter((item): item is LinksGroupProps => !!item);
}

export function getNavbarItems(
    featureEntrypoint:
        | "Admin"
        | "Order Management"
        | "nventory Management"
        | "Recipe Costing"
): LinksGroupProps[] {
    const navBarItems = getAuthorizedUserFeatureLinksGroupProps();

    for (const item of navBarItems) {
        if (item.label === featureEntrypoint) {
            item.initiallyOpened = true;
        }
    }

    return navBarItems;
}

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
