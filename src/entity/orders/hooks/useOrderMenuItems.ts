import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type OrderMenuItem = components["schemas"]["OrderMenuItem"];

export interface UseOrderMenuItemsOptions {
    relations?: (keyof OrderMenuItem)[];
    limit?: number;
    offset?: string;
}

export function useOrderMenuItems(options: UseOrderMenuItemsOptions = {}) {
    return useGenericEntity<OrderMenuItem>(
        {
            endpoint: "/order-menu-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "orderMenuItems",
            createPropertyName: "createOrderMenuItem",
            updatePropertyName: "updateOrderMenuItem",
            deletePropertyName: "deleteOrderMenuItem",
        },
        options
    );
}
