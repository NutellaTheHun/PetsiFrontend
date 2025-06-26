import type { components } from "../../../api-types";
import { useGenericEntity } from "../useGenericEntity";

type UnitOfMeasureCategory = components["schemas"]["UnitOfMeasureCategory"];

export interface UseUnitOfMeasureCategoriesOptions {
    relations?: (keyof UnitOfMeasureCategory)[];
    limit?: number;
    offset?: string;
}

export function useUnitOfMeasureCategories(
    options: UseUnitOfMeasureCategoriesOptions = {}
) {
    return useGenericEntity<UnitOfMeasureCategory>(
        {
            endpoint: "/unit-of-measure-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "categories",
            createPropertyName: "createCategory",
            updatePropertyName: "updateCategory",
            deletePropertyName: "deleteCategory",
        },
        options
    );
}
