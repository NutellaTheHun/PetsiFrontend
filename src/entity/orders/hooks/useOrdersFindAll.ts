import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Order } from "../../entityTypes";

export interface UseOrdersOptions {
    relations?: (keyof Order)[];
    limit?: number;
    offset?: string;
}

export function useOrdersFindAll(options: UseOrdersOptions = {}) {
    return useEntityFindAll<Order>(
        {
            endpoint: "/orders",
            defaultSortKey: "createdAt",
            defaultSortDirection: SORT_DIRECTION.DESC,
            supportsSearch: true,
            supportsFilters: true,
            supportsDateFiltering: true,
            itemsPropertyName: "orders",
        },
        options
    );
}
