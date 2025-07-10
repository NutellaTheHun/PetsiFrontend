import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryAreaItem } from "../../entityTypes";

export type InventoryAreaItemSortKey = keyof Pick<
    InventoryAreaItem,
    "countedItem" | "amount" | "id"
>;

export interface UseInventoryAreaItemsOptions {
    relations?: (keyof InventoryAreaItem)[];
    limit?: number;
    offset?: string;
}

export function useInventoryAreaItemsFindAll(
    options: UseInventoryAreaItemsOptions = {}
) {
    return useEntityFindAll<InventoryAreaItem>(
        {
            endpoint: "/inventory-area-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            itemsPropertyName: "inventoryAreaItems",
        },
        options
    );
}
