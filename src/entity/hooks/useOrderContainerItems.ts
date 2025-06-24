import type { components } from "../../api-types";
import { useGenericEntity } from "./useGenericEntity";

type OrderContainerItem = components["schemas"]["OrderContainerItem"];

export interface UseOrderContainerItemsOptions {
    relations?: (keyof OrderContainerItem)[];
    limit?: number;
    offset?: string;
}

export function useOrderContainerItems(
    options: UseOrderContainerItemsOptions = {}
) {
    return useGenericEntity<OrderContainerItem>(
        {
            endpoint: "/order-container-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "orderContainerItems",
            updatePropertyName: "updateOrderContainerItem",
            deletePropertyName: "deleteOrderContainerItem",
        },
        options
    );
}
