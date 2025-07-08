import type { components } from "../../../api-types";
import {
    useGenericEntity,
    type DateQueryParams,
} from "../../../lib/entityHookTemplates/UseGenericEntity";

type Order = components["schemas"]["Order"];

export interface UseOrdersOptions extends DateQueryParams {
    relations?: (keyof Order)[];
    limit?: number;
    offset?: string;
}

export function useOrders(options: UseOrdersOptions = {}) {
    return useGenericEntity<Order, UseOrdersOptions>(
        {
            endpoint: "/orders",
            defaultSortKey: "id",
            defaultSortDirection: "DESC",
            supportsSearch: true,
            supportsFilters: true,
            supportsDateFiltering: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "orders",
            createPropertyName: "createOrder",
            updatePropertyName: "updateOrder",
            deletePropertyName: "deleteOrder",
        },
        options
    );
}
