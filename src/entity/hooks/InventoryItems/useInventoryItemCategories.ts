import type { components } from "../../../api-types";
import { useGenericEntity } from "../useGenericEntity";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export interface UseInventoryItemCategoriesOptions {
    relations?: (keyof InventoryItemCategory)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemCategories(
    options: UseInventoryItemCategoriesOptions = {}
) {
    return useGenericEntity<InventoryItemCategory>(
        {
            endpoint: "/inventory-item-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryItemCategories",
            createPropertyName: "createCategory",
            updatePropertyName: "updateCategory",
            deletePropertyName: "deleteCategory",
        },
        options
    );
}
