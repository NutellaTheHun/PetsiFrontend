import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { OrderMenuItem } from "../../entityTypes";

export type OrderMenuItemSortKey = keyof Pick<
    OrderMenuItem,
    "id" | "quantity" | "menuItem"
>;

export interface UseOrderMenuItemsOptions {
    relations?: (keyof OrderMenuItem)[];
    selectedOrderId?: number | null;
    limit?: number;
    offset?: string;
}

export function useOrderMenuItemsFindAll(
    options: UseOrderMenuItemsOptions = {}
) {
    return useEntityFindAll<
        OrderMenuItem,
        OrderMenuItemSortKey,
        UseOrderMenuItemsOptions
    >(
        {
            endpoint: "/order-menu-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "orderMenuItems",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedOrderId) {
                    queryParams.filters = [`order,${options.selectedOrderId}`];
                }

                return queryParams;
            },
        },
        options
    );
}
