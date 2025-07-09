import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItemCategory } from "../../entityTypes";

export interface UseInventoryItemCategoriesOptions {
    relations?: (keyof InventoryItemCategory)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemCategoriesFindAll(
    options: UseInventoryItemCategoriesOptions = {}
) {
    return useEntityFindAll<InventoryItemCategory>(
        {
            endpoint: "/inventory-item-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryItemCategories",
        },
        options
    );
}
