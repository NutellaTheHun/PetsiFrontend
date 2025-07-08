import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type InventoryItemPackage = components["schemas"]["InventoryItemPackage"];

export interface UseInventoryItemPackagesOptions {
    relations?: (keyof InventoryItemPackage)[];
    limit?: number;
    offset?: string;
}

export function useInventoryItemPackages(
    options: UseInventoryItemPackagesOptions = {}
) {
    return useGenericEntity<InventoryItemPackage>(
        {
            endpoint: "/inventory-item-packages",
            defaultSortKey: "packageName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "inventoryItemPackages",
            createPropertyName: "createPackage",
            updatePropertyName: "updatePackage",
            deletePropertyName: "deletePackage",
        },
        options
    );
}
