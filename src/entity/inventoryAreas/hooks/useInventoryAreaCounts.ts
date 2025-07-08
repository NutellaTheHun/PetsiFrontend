import type { components } from "../../../api-types";
import {
    SORT_DIRECTION,
    useGenericEntity,
    type DateQueryParams,
} from "../../../lib/entityHookTemplates/UseGenericEntity";
import type { InventoryAreaCountSortKey } from "./useInventoryAreaItems";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];

interface UseInventoryAreaCountsOptions extends DateQueryParams {
    relations?: (keyof InventoryAreaCount)[];
    selectedAreaId?: number | null;
    limit?: number;
    offset?: string;
}

export function useInventoryAreaCounts(
    options: UseInventoryAreaCountsOptions = {}
) {
    return useGenericEntity<
        InventoryAreaCount,
        InventoryAreaCountSortKey,
        UseInventoryAreaCountsOptions
    >(
        {
            endpoint: "/inventory-area-counts",
            defaultSortKey: "countDate" as InventoryAreaCountSortKey,
            defaultSortDirection: SORT_DIRECTION.DESC,
            supportsSearch: true,
            supportsDateFiltering: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
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
            itemsPropertyName: "inventoryAreaCounts",
            createPropertyName: "createInventoryAreaCount",
            updatePropertyName: "updateInventoryAreaCount",
            deletePropertyName: "deleteInventoryAreaCount",
        },
        options
    );
}
