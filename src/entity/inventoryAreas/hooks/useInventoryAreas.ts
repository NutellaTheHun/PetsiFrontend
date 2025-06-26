import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/generics/UseGenericEntity";

type InventoryArea = components["schemas"]["InventoryArea"];

export interface UseInventoryAreasOptions {
    relations?: (keyof InventoryArea)[];
    limit?: number;
    offset?: string;
}

export function useInventoryAreas(options: UseInventoryAreasOptions = {}) {
    return useGenericEntity<InventoryArea>(
        {
            endpoint: "/inventory-areas",
            defaultSortKey: "areaName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryAreas",
            createPropertyName: "createArea",
            updatePropertyName: "updateArea",
            deletePropertyName: "deleteArea",
        },
        options
    );
}
