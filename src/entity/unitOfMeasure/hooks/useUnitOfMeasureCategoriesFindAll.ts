import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { UnitOfMeasureCategory } from "../../entityTypes";

export interface UseUnitOfMeasureCategoriesOptions {
    relations?: (keyof UnitOfMeasureCategory)[];
    limit?: number;
    offset?: string;
}

export function useUnitOfMeasureCategoriesFindAll(
    options: UseUnitOfMeasureCategoriesOptions = {}
) {
    return useEntityFindAll<UnitOfMeasureCategory>(
        {
            endpoint: "/unit-of-measure-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "unitOfMeasureCategories",
        },
        options
    );
}
