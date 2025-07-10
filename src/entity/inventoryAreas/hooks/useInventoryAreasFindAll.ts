import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryArea } from "../../entityTypes";

export type InventoryAreaSortKey = keyof Pick<InventoryArea, "areaName" | "id">;

export interface UseInventoryAreasOptions {
    relations?: (keyof InventoryArea)[];
    limit?: number;
    offset?: string;
}

export function useInventoryAreasFindAll(
    options: UseInventoryAreasOptions = {}
) {
    return useEntityFindAll<InventoryArea>(
        {
            endpoint: "/inventory-areas",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryAreas",
        },
        options
    );
}
