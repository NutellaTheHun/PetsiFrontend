import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItemCategory } from "../../entityTypes";

export type InventoryItemCategorySortKey = keyof Pick<
    InventoryItemCategory,
    "categoryName" | "id"
>;

export interface UseInventoryItemCategoriesOptions {
    relations?: (keyof InventoryItemCategory)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemCategoriesFindAll(
    options: UseInventoryItemCategoriesOptions = {}
) {
    return useEntityFindAll<
        InventoryItemCategory,
        InventoryItemCategorySortKey,
        UseInventoryItemCategoriesOptions
    >(
        {
            endpoint: "/inventory-item-categories",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryItemCategories",
        },
        options
    );
}
