import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Order } from "../../entityTypes";

export type OrderSortKey = keyof Pick<
    Order,
    "createdAt" | "fulfillmentDate" | "recipient" | "orderCategory" | "id"
>;

export interface UseOrdersOptions {
    relations?: (keyof Order)[];
    selectedCategoryId?: number | null;
    isFrozen?: boolean;
    selectedFulfillmentType?: "pickup" | "delivery" | null;
    limit?: number;
    offset?: string;
}

export function useOrdersFindAll(options: UseOrdersOptions = {}) {
    return useEntityFindAll<Order, OrderSortKey, UseOrdersOptions>(
        {
            endpoint: "/orders",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.DESC,
            supportsSearch: true,
            supportsFilters: true,
            supportsDateFiltering: true,
            itemsPropertyName: "orders",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedCategoryId) {
                    queryParams.filters = [
                        `orderCategory,${options.selectedCategoryId}`,
                    ];
                }

                if (options.isFrozen) {
                    queryParams.filters = [`isFrozen,${options.isFrozen}`];
                }

                if (options.selectedFulfillmentType) {
                    queryParams.filters = [
                        `fulfillmentType,${options.selectedFulfillmentType}`,
                    ];
                }

                return queryParams;
            },
        },
        options
    );
}
