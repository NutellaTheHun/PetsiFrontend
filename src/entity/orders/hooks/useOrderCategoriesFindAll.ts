import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { OrderCategory } from "../../entityTypes";

export type OrderCategorySortKey = keyof Pick<
    OrderCategory,
    "categoryName" | "id"
>;

export interface UseOrderCategoriesOptions {
    relations?: (keyof OrderCategory)[];
    limit?: number;
    offset?: string;
}

export function useOrderCategoriesFindAll(
    options: UseOrderCategoriesOptions = {}
) {
    return useEntityFindAll<OrderCategory>(
        {
            endpoint: "/order-categories",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "orderCategories",
        },
        options
    );
}
