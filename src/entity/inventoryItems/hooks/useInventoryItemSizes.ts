import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/generics/UseGenericEntity";

type InventoryItemSize = components["schemas"]["InventoryItemSize"];

export interface UseInventoryItemSizesOptions {
    relations?: (keyof InventoryItemSize)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemSizes(
    options: UseInventoryItemSizesOptions = {}
) {
    return useGenericEntity<InventoryItemSize>(
        {
            endpoint: "/inventory-item-sizes",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryItemSizes",
            updatePropertyName: "updateInventoryItemSize",
            deletePropertyName: "deleteInventoryItemSize",
        },
        options
    );
}
