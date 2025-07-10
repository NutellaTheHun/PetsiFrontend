import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItem } from "../../entityTypes";

export type MenuItemSortKey = keyof Pick<MenuItem, "itemName" | "id">;

export interface UseMenuItemsOptions {
    relations?: (keyof MenuItem)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemsFindAll(options: UseMenuItemsOptions = {}) {
    return useEntityFindAll<MenuItem>(
        {
            endpoint: "/menu-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "menuItems",
        },
        options
    );
}
