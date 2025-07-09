import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { OrderContainerItem } from "../../entityTypes";

export interface UseOrderContainerItemsOptions {
    relations?: (keyof OrderContainerItem)[];
    limit?: number;
    offset?: string;
}

export function useOrderContainerItemsFindAll(
    options: UseOrderContainerItemsOptions = {}
) {
    return useEntityFindAll<OrderContainerItem>(
        {
            endpoint: "/order-container-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "orderContainerItems",
        },
        options
    );
}
