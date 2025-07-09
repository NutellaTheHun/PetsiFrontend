import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItemSize } from "../../entityTypes";

export interface UseInventoryItemSizesOptions {
    relations?: (keyof InventoryItemSize)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemSizesFindAll(
    options: UseInventoryItemSizesOptions = {}
) {
    return useEntityFindAll<InventoryItemSize>(
        {
            endpoint: "/inventory-item-sizes",
            defaultSortKey: "sizeName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryItemSizes",
        },
        options
    );
}
