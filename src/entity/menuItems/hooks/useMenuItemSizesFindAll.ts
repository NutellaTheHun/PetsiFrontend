import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemSize } from "../../entityTypes";

export interface UseMenuItemSizesOptions {
    relations?: (keyof MenuItemSize)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemSizesFindAll(options: UseMenuItemSizesOptions = {}) {
    return useEntityFindAll<MenuItemSize>(
        {
            endpoint: "/menu-item-sizes",
            defaultSortKey: "sizeName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemSizes",
        },
        options
    );
}
