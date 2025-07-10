import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export type InventoryItemCategorySortKey = keyof Pick<
    InventoryItemCategory,
    "categoryName" | "id"
>;

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
            defaultSortKey: "id",
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
