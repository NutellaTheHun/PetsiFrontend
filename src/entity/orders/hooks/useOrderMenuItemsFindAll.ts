import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { OrderMenuItem } from "../../entityTypes";

export interface UseOrderMenuItemsOptions {
    relations?: (keyof OrderMenuItem)[];
    limit?: number;
    offset?: string;
}

export function useOrderMenuItemsFindAll(
    options: UseOrderMenuItemsOptions = {}
) {
    return useEntityFindAll<OrderMenuItem>(
        {
            endpoint: "/order-menu-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "orderMenuItems",
        },
        options
    );
}
