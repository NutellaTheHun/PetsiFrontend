import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItem } from "../../entityTypes";

export type MenuItemSortKey = keyof Pick<
    MenuItem,
    "itemName" | "category" | "id"
>;

export interface UseMenuItemsOptions {
    relations?: (keyof MenuItem)[];
    selectedCategoryId?: number | null;
    limit?: number;
    offset?: string;
}
// Support filter by vegan? should it be a property or search by name contains vegan?
export function useMenuItemsFindAll(options: UseMenuItemsOptions = {}) {
    return useEntityFindAll<MenuItem, MenuItemSortKey, UseMenuItemsOptions>(
        {
            endpoint: "/menu-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "menuItems",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedCategoryId) {
                    queryParams.filters = [
                        `category,${options.selectedCategoryId}`,
                    ];
                }
            },
        },
        options
    );
}
