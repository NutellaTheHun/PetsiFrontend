import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemContainerItem } from "../../entityTypes";

export interface UseMenuItemContainerItemsOptions {
    relations?: (keyof MenuItemContainerItem)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemContainerItemsFindAll(
    options: UseMenuItemContainerItemsOptions = {}
) {
    return useEntityFindAll<MenuItemContainerItem>(
        {
            endpoint: "/menu-item-container-items",
            defaultSortKey: "itemName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemContainerItems",
        },
        options
    );
}
