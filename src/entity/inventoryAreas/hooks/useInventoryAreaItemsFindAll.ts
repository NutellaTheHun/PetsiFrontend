import type { components } from "../../../api-types";
import { useEntityFindAll } from "../../../lib/generics/UseEntityFindAll";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export interface UseInventoryAreaItemsFindAllOptions {
    relations?: (keyof InventoryAreaItem)[];
    selectedCountId?: number | null;
    limit?: number;
    offset?: string;
}

export function useInventoryAreaItemsFindAll(
    options: UseInventoryAreaItemsFindAllOptions = {}
) {
    return useEntityFindAll<
        InventoryAreaItem,
        UseInventoryAreaItemsFindAllOptions
    >(
        {
            endpoint: "/inventory-area-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsSearch: true,
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
        },
        options
    );
}
