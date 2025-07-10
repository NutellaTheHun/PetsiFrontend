import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemContainerItem } from "../../entityTypes";

export type MenuItemContainerItemSortKey = keyof Pick<
    MenuItemContainerItem,
    "id" | "containedItem"
>;

export interface UseMenuItemContainerItemsOptions {
    relations?: (keyof MenuItemContainerItem)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemContainerItemsFindAll(
    options: UseMenuItemContainerItemsOptions = {}
) {
    return useEntityFindAll<
        MenuItemContainerItem,
        MenuItemContainerItemSortKey,
        UseMenuItemContainerItemsOptions
    >(
        {
            endpoint: "/menu-item-container-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemContainerItems",
        },
        options
    );
}
