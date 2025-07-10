import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItemSize } from "../../entityTypes";

export type InventoryItemSizeSortKey = keyof Pick<
    InventoryItemSize,
    "cost" | "id"
>;

export interface UseInventoryItemSizesOptions {
    relations?: (keyof InventoryItemSize)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemSizesFindAll(
    options: UseInventoryItemSizesOptions = {}
) {
    return useEntityFindAll<
        InventoryItemSize,
        InventoryItemSizeSortKey,
        UseInventoryItemSizesOptions
    >(
        {
            endpoint: "/inventory-item-sizes",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryItemSizes",
        },
        options
    );
}
