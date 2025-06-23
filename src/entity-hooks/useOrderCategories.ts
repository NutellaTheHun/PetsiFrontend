import type { components } from "../api-types";
import { useGenericEntity } from "./useGenericEntity";

type OrderCategory = components["schemas"]["OrderCategory"];

export interface UseOrderCategoriesOptions {
    relations?: (keyof OrderCategory)[];
    limit?: number;
    offset?: string;
}

export function useOrderCategories(options: UseOrderCategoriesOptions = {}) {
    return useGenericEntity<OrderCategory>(
        {
            endpoint: "/order-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "orderCategories",
            createPropertyName: "createCategory",
            updatePropertyName: "updateCategory",
            deletePropertyName: "deleteCategory",
        },
        options
    );
}
