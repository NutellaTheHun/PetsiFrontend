import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";
import type { InventoryItem } from "../../entityTypes";

export interface UseInventoryItemsOptions {
    relations?: (keyof InventoryItem)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItems(options: UseInventoryItemsOptions = {}) {
    return useGenericEntity<InventoryItem>(
        {
            endpoint: "/inventory-items",
            defaultSortKey: "itemName",
            defaultSortDirection: "ASC",
            supportsSearch: true,
            supportsFilters: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryItems",
            createPropertyName: "createInventoryItem",
            updatePropertyName: "updateInventoryItem",
            deletePropertyName: "deleteInventoryItem",
        },
        options
    );
}
