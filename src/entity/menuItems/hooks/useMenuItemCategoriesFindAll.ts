import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemCategory } from "../../entityTypes";

export type MenuItemCategorySortKey = keyof Pick<
    MenuItemCategory,
    "categoryName" | "id"
>;

export interface UseMenuItemCategoriesOptions {
    relations?: (keyof MenuItemCategory)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemCategoriesFindAll(
    options: UseMenuItemCategoriesOptions = {}
) {
    return useEntityFindAll<
        MenuItemCategory,
        MenuItemCategorySortKey,
        UseMenuItemCategoriesOptions
    >(
        {
            endpoint: "/menu-item-categories",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemCategories",
        },
        options
    );
}
