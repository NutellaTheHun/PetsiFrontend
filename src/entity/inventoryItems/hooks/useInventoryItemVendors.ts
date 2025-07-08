import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

export interface UseInventoryItemVendorsOptions {
    relations?: (keyof InventoryItemVendor)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemVendors(
    options: UseInventoryItemVendorsOptions = {}
) {
    return useGenericEntity<InventoryItemVendor>(
        {
            endpoint: "/inventory-item-vendors",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryItemVendors",
            createPropertyName: "createVendor",
            updatePropertyName: "updateVendor",
            deletePropertyName: "deleteVendor",
        },
        options
    );
}
