import type { components } from "../../../api-types";
import { useGenericEntity } from "../useGenericEntity";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export interface UseInventoryAreaItemsOptions {
    relations?: (keyof InventoryAreaItem)[];
    selectedCountId?: number | null;
    limit?: number;
    offset?: string;
}

export function useInventoryAreaItems(
    options: UseInventoryAreaItemsOptions = {}
) {
    return useGenericEntity<InventoryAreaItem, UseInventoryAreaItemsOptions>(
        {
            endpoint: "/inventory-area-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsSearch: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedCountId) {
                    queryParams.filters = [
                        `inventoryAreaCount,${options.selectedCountId}`,
                    ];
                }

                return queryParams;
            },
            itemsPropertyName: "inventoryAreaItems",
            createPropertyName: "createInventoryAreaItem",
            updatePropertyName: "updateInventoryAreaItem",
            deletePropertyName: "deleteInventoryAreaItem",
        },
        options
    );
}
