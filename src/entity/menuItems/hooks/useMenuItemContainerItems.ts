import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type MenuItemContainerItem = components["schemas"]["MenuItemContainerItem"];

export interface UseMenuItemContainerItemsOptions {
    relations?: (keyof MenuItemContainerItem)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemContainerItems(
    options: UseMenuItemContainerItemsOptions = {}
) {
    return useGenericEntity<MenuItemContainerItem>(
        {
            endpoint: "/menu-item-container-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "menuItemContainerItems",
            createPropertyName: "createContainerItem",
            updatePropertyName: "updateContainerItem",
            deletePropertyName: "deleteContainerItem",
        },
        options
    );
}
