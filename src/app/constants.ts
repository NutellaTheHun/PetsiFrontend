import {
    AUTH_ADMIN,
    AUTH_ADMIN_PANEL,
    AUTH_DOCK,
    AUTH_INVENTORY,
    AUTH_MANAGER,
    AUTH_ORDERS,
    AUTH_RECIPE,
    AUTH_STAFF,
} from "../lib/auth-constants";
import {
    adminDockProps,
    inventoryDockProps,
    orderDockProps,
    recipeDockProps,
    type NewDockItemDockItemProps,
} from "../lib/uiComponents/dock/MantineDock";
import type { LinksGroupProps } from "../lib/uiComponents/navbar/MantineLinksGroup";
import {
    adminPanelItem,
    inventoryManagementItem,
    orderManagementItem,
    recipeCostingItem,
} from "../lib/uiComponents/navbar/MantineNavbar";
import { ROUTE } from "./routes/constants";

export const RoleFeatureMap: Record<string, string[]> = {
    [AUTH_STAFF]: [AUTH_DOCK, AUTH_ORDERS],
    [AUTH_MANAGER]: [AUTH_DOCK, AUTH_ORDERS, AUTH_INVENTORY, AUTH_RECIPE],
    [AUTH_ADMIN]: [AUTH_DOCK, AUTH_INVENTORY, AUTH_RECIPE, AUTH_ADMIN_PANEL],
};

export const FeaturePathMap: Record<string, string> = {
    [AUTH_ORDERS]: ROUTE.ORDER.ROOT,
    [AUTH_INVENTORY]: ROUTE.INVENTORY.ROOT,
    [AUTH_RECIPE]: ROUTE.RECIPE.ROOT,
    [AUTH_ADMIN_PANEL]: ROUTE.ADMIN.ROOT,
    [AUTH_DOCK]: ROUTE.DOCK,
};

export const FeatureDockItemMap: Record<string, NewDockItemDockItemProps> = {
    [AUTH_ORDERS]: orderDockProps,
    [AUTH_INVENTORY]: inventoryDockProps,
    [AUTH_RECIPE]: recipeDockProps,
    [AUTH_ADMIN_PANEL]: adminDockProps,
};

export const FeatureNavbarItemMap: Record<string, LinksGroupProps> = {
    [AUTH_ORDERS]: orderManagementItem,
    [AUTH_INVENTORY]: inventoryManagementItem,
    [AUTH_RECIPE]: recipeCostingItem,
    [AUTH_ADMIN_PANEL]: adminPanelItem,
};
