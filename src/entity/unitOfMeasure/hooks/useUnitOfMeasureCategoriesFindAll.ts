import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { UnitOfMeasureCategory } from "../../entityTypes";

export type UnitOfMeasureCategorySortKey = keyof Pick<
    UnitOfMeasureCategory,
    "categoryName" | "id"
>;

export interface UseUnitOfMeasureCategoriesOptions {
    relations?: (keyof UnitOfMeasureCategory)[];
    limit?: number;
    offset?: string;
}

export function useUnitOfMeasureCategoriesFindAll(
    options: UseUnitOfMeasureCategoriesOptions = {}
) {
    return useEntityFindAll<
        UnitOfMeasureCategory,
        UnitOfMeasureCategorySortKey,
        UseUnitOfMeasureCategoriesOptions
    >(
        {
            endpoint: "/unit-of-measure-categories",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "unitOfMeasureCategories",
        },
        options
    );
}
