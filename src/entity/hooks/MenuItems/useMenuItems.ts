import type { components } from "../../../api-types";
import { useGenericEntity } from "../useGenericEntity";

type MenuItem = components["schemas"]["MenuItem"];

export interface UseMenuItemsOptions {
    relations?: (keyof MenuItem)[];
    limit?: number;
    offset?: string;
}

export function useMenuItems(options: UseMenuItemsOptions = {}) {
    return useGenericEntity<MenuItem>(
        {
            endpoint: "/menu-items",
            defaultSortKey: "itemName",
            defaultSortDirection: "ASC",
            supportsSearch: true,
            supportsFilters: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "menuItems",
            createPropertyName: "createMenuItem",
            updatePropertyName: "updateMenuItem",
            deletePropertyName: "deleteMenuItem",
        },
        options
    );
}
