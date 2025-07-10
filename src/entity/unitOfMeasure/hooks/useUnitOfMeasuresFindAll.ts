import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { UnitOfMeasure } from "../../entityTypes";

export type UnitOfMeasureSortKey = keyof Pick<
    UnitOfMeasure,
    "name" | "id" | "category"
>;

export interface UseUnitOfMeasuresOptions {
    relations?: (keyof UnitOfMeasure)[];
    selectedCategoryId?: number | null;
    limit?: number;
    offset?: string;
}

export function useUnitOfMeasuresFindAll(
    options: UseUnitOfMeasuresOptions = {}
) {
    return useEntityFindAll<
        UnitOfMeasure,
        UnitOfMeasureSortKey,
        UseUnitOfMeasuresOptions
    >(
        {
            endpoint: "/units-of-measure",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "unitOfMeasures",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedCategoryId) {
                    queryParams.filters = [
                        `category,${options.selectedCategoryId}`,
                    ];
                }
            },
        },
        options
    );
}
