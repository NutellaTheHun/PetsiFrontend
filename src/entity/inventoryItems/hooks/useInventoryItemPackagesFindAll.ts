import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { InventoryItemPackage } from "../../entityTypes";

export interface UseInventoryItemPackagesOptions {
    relations?: (keyof InventoryItemPackage)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemPackagesFindAll(
    options: UseInventoryItemPackagesOptions = {}
) {
    return useEntityFindAll<InventoryItemPackage>(
        {
            endpoint: "/inventory-item-packages",
            defaultSortKey: "packageName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "inventoryItemPackages",
        },
        options
    );
}
