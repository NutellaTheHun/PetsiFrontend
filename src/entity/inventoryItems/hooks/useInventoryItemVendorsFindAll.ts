import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItemVendor } from "../../entityTypes";

export interface UseInventoryItemVendorsOptions {
    relations?: (keyof InventoryItemVendor)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemVendorsFindAll(
    options: UseInventoryItemVendorsOptions = {}
) {
    return useEntityFindAll<InventoryItemVendor>(
        {
            endpoint: "/inventory-item-vendors",
            defaultSortKey: "vendorName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryItemVendors",
        },
        options
    );
}
