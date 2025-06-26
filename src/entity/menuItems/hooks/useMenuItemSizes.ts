import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/generics/UseGenericEntity";

type MenuItemSize = components["schemas"]["MenuItemSize"];

export interface UseMenuItemSizesOptions {
    relations?: (keyof MenuItemSize)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemSizes(options: UseMenuItemSizesOptions = {}) {
    return useGenericEntity<MenuItemSize>(
        {
            endpoint: "/menu-item-sizes",
            defaultSortKey: "sizeName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "menuItemSizes",
            createPropertyName: "createSize",
            updatePropertyName: "updateSize",
            deletePropertyName: "deleteSize",
        },
        options
    );
}
