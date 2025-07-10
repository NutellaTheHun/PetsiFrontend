import {
    SORT_DIRECTION,
    useEntityFindAll,
    type DateQueryParams,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryAreaCount } from "../../entityTypes";

export type InventoryAreaCountSortKey = keyof Pick<
    InventoryAreaCount,
    "countDate" | "inventoryArea" | "id"
>;

export interface UseInventoryAreaCountsOptions extends DateQueryParams {
    relations?: (keyof InventoryAreaCount)[];
    limit?: number;
    selectedAreaId?: number | null;
    offset?: string;
}

export function useInventoryAreaCountsFindAll(
    options: UseInventoryAreaCountsOptions = {}
) {
    return useEntityFindAll<
        InventoryAreaCount,
        InventoryAreaCountSortKey,
        UseInventoryAreaCountsOptions
    >(
        {
            endpoint: "/inventory-area-counts",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsDateFiltering: true,
            itemsPropertyName: "inventoryAreaCounts",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                // Add filters if selectedAreaId is provided
                if (options.selectedAreaId) {
                    queryParams.filters = [
                        `inventoryArea,${options.selectedAreaId}`,
                    ];
                }

                return queryParams;
            },
        },
        options
    );
}
