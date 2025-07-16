import { Button, Card, Group, Text, useMantineTheme } from "@mantine/core";
import {
    IconBuildingWarehouse,
    IconChefHat,
    IconFocusAuto,
    IconShoppingCart,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { FeatureDockItemMap, RoleFeatureMap } from "../../../app/constants";
import { ROUTE } from "../../../app/routes/constants";
import { AUTH_DOCK } from "../../auth-constants";
import classes from "./MantineDock.module.css";

export type NewDockItemDockItemProps = {
    linkTo: string;
    text: string;
    icon: React.FC<any>;
};
export function NewDockItem({
    linkTo,
    text,
    icon: Icon,
}: NewDockItemDockItemProps) {
    const theme = useMantineTheme();
    const navigate = useNavigate();
    return (
        <Button
            key={text}
            className={classes.item}
            onClick={() => navigate(linkTo)}
            variant="outline"
            size="lg"
            radius="md"
        >
            <Icon color={theme.colors.blue[6]} size={32} />
            <Text size="xs" mt={7}>
                {text}
            </Text>
        </Button>
    );
}

type Props = {
    userRoles: string[];
};
export function FeatureDock({ userRoles }: Props) {
    const features = new Set<string>();
    userRoles.forEach((role) => {
        const roleAccess = RoleFeatureMap[role];
        roleAccess.forEach((p) => features.add(p));
    });

    const validFeatures = Array.from(features).filter((p) => p !== AUTH_DOCK);

    const dockItemProps = Array.from(validFeatures).map(
        (feature) => FeatureDockItemMap[feature]
    );

    const items = dockItemProps.map((item) => (
        <NewDockItem key={item.text} {...item} />
    ));

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Group justify="space-between">
                <Text className={classes.title}>Services</Text>
            </Group>
            <Group mt="md">{items}</Group>
        </Card>
    );
}

// Admin Panel
export const adminDockProps = {
    linkTo: ROUTE.ADMIN.ROOT,
    text: "Admin",
    icon: IconFocusAuto,
};
// Recipe Costing
export const recipeDockProps = {
    linkTo: ROUTE.RECIPE.ROOT,
    text: "Recipe Costing",
    icon: IconChefHat,
};
// Inventory Management
export const inventoryDockProps = {
    linkTo: ROUTE.INVENTORY.ROOT,
    text: "Inventory Management",
    icon: IconBuildingWarehouse,
};
// Order Management
export const orderDockProps = {
    linkTo: ROUTE.ORDER.ROOT,
    text: "Order Management",
    icon: IconShoppingCart,
};
