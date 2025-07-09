import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemCategory } from "../../entityTypes";

export interface UseMenuItemCategoriesOptions {
    relations?: (keyof MenuItemCategory)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemCategoriesFindAll(
    options: UseMenuItemCategoriesOptions = {}
) {
    return useEntityFindAll<MenuItemCategory>(
        {
            endpoint: "/menu-item-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemCategories",
        },
        options
    );
}
