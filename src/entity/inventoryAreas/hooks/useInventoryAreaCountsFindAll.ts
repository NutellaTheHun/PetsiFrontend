import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryAreaCount } from "../../entityTypes";

export interface UseInventoryAreaCountsOptions {
    relations?: (keyof InventoryAreaCount)[];
    limit?: number;
    offset?: string;
}

export function useInventoryAreaCountsFindAll(
    options: UseInventoryAreaCountsOptions = {}
) {
    return useEntityFindAll<InventoryAreaCount>(
        {
            endpoint: "/inventory-area-counts",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsDateFiltering: true,
            itemsPropertyName: "inventoryAreaCounts",
        },
        options
    );
}
