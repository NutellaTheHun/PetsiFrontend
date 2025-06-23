import type { components } from "../api-types";
import { useGenericEntity } from "./useGenericEntity";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export interface UseInventoryAreaItemsOptions {
    relations?: (keyof InventoryAreaItem)[];
    limit?: number;
    offset?: string;
}

export function useInventoryAreaItems(
    options: UseInventoryAreaItemsOptions = {}
) {
    return useGenericEntity<InventoryAreaItem>(
        {
            endpoint: "/inventory-area-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsSearch: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryAreaItems",
            updatePropertyName: "updateInventoryAreaItem",
            deletePropertyName: "deleteInventoryAreaItem",
        },
        options
    );
}
