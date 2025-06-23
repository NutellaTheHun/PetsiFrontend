import type { components } from "../api-types";
import type { DateQueryParams } from "./useGenericEntity";
import { useGenericEntity } from "./useGenericEntity";

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
            defaultSortKey: "id",
            defaultSortDirection: "DESC",
            supportsSearch: true,
            supportsDateFiltering: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            customQueryParams: (options, dynamicParams) => {
                // Build filters array based on selectedAreaId
                const filters: string[] = [];
                if (options.selectedAreaId) {
                    filters.push(`inventoryArea=${options.selectedAreaId}`);
                }

                return {
                    ...dynamicParams,
                    filters: filters.length > 0 ? filters : undefined,
                };
            },
            itemsPropertyName: "inventoryAreaCounts",
            createPropertyName: "createInventoryAreaCount",
            updatePropertyName: "updateInventoryAreaCount",
            deletePropertyName: "deleteInventoryAreaCount",
        },
        options
    );
}
