import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItem } from "../../entityTypes";

export type InventoryItemSortKey = keyof Pick<
    InventoryItem,
    "itemName" | "id" | "vendor" | "category"
>;

export interface UseInventoryItemsOptions {
    relations?: (keyof InventoryItem)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemsFindAll(
    options: UseInventoryItemsOptions = {}
) {
    return useEntityFindAll<InventoryItem>(
        {
            endpoint: "/inventory-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "inventoryItems",
        },
        options
    );
}
