import type { components } from "../../../api-types";
import { useGenericEntity, type DateQueryParams } from "../useGenericEntity";

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
    return useGenericEntity<InventoryAreaCount, UseInventoryAreaCountsOptions>(
        {
            endpoint: "/inventory-area-counts",
            defaultSortKey: "countDate",
            defaultSortDirection: "DESC",
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
