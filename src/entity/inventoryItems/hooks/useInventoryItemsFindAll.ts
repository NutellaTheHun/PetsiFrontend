import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItem } from "../../entityTypes";

export type InventoryItemSortKey = keyof Pick<
    InventoryItem,
    "itemName" | "id" | "vendor" | "category"
>;

export interface UseInventoryItemsOptions {
    relations?: (keyof InventoryItem)[];
    selectedCategoryId?: number | null;
    selectedVendorId?: number | null;
    limit?: number;
    offset?: string;
}

export function useInventoryItemsFindAll(
    options: UseInventoryItemsOptions = {}
) {
    return useEntityFindAll<
        InventoryItem,
        InventoryItemSortKey,
        UseInventoryItemsOptions
    >(
        {
            endpoint: "/inventory-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "inventoryItems",
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

                if (options.selectedVendorId) {
                    queryParams.filters = [
                        `vendor,${options.selectedVendorId}`,
                    ];
                }

                return queryParams;
            },
        },
        options
    );
}
