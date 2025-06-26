import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/generics/UseGenericEntity";

type MenuItemCategory = components["schemas"]["MenuItemCategory"];

export interface UseMenuItemCategoriesOptions {
    relations?: (keyof MenuItemCategory)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemCategories(
    options: UseMenuItemCategoriesOptions = {}
) {
    return useGenericEntity<MenuItemCategory>(
        {
            endpoint: "/menu-item-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "menuItemCategories",
            createPropertyName: "createCategory",
            updatePropertyName: "updateCategory",
            deletePropertyName: "deleteCategory",
        },
        options
    );
}
