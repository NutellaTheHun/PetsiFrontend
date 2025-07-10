import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryAreaItem } from "../../entityTypes";

export type InventoryAreaItemSortKey = keyof Pick<
    InventoryAreaItem,
    "countedItem" | "amount" | "id"
>;

export interface UseInventoryAreaItemsOptions {
    relations?: (keyof InventoryAreaItem)[];
    selectedCountId?: number | null;
    limit?: number;
    offset?: string;
}

export function useInventoryAreaItemsFindAll(
    options: UseInventoryAreaItemsOptions = {}
) {
    return useEntityFindAll<
        InventoryAreaItem,
        InventoryAreaItemSortKey,
        UseInventoryAreaItemsOptions
    >(
        {
            endpoint: "/inventory-area-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            itemsPropertyName: "inventoryAreaItems",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedCountId) {
                    queryParams.filters = [
                        `parentInventoryCount,${options.selectedCountId}`,
                    ];
                }

                return queryParams;
            },
        },
        options
    );
}
