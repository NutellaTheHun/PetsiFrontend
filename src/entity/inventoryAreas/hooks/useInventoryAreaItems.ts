import {
    SORT_DIRECTION,
    useGenericEntity,
} from "../../../lib/generics/UseGenericEntity";
import type { InventoryAreaCount, InventoryAreaItem } from "../../entityTypes";

export type InventoryAreaCountSortKey = keyof Pick<
    InventoryAreaCount,
    "countDate" | "inventoryArea"
>;

export interface UseInventoryAreaItemsOptions {
    relations?: (keyof InventoryAreaItem)[];
    selectedCountId?: number | null;
    limit?: number;
    offset?: string;
}

export function useInventoryAreaItems(
    options: UseInventoryAreaItemsOptions = {}
) {
    return useGenericEntity<
        InventoryAreaItem,
        InventoryAreaCountSortKey,
        UseInventoryAreaItemsOptions
    >(
        {
            endpoint: "/inventory-area-items",
            defaultSortKey: "countDate",
            defaultSortDirection: SORT_DIRECTION.ASC,
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
