import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type MenuItemContainerRule = components["schemas"]["MenuItemContainerRule"];

export interface UseMenuItemContainerRulesOptions {
    relations?: (keyof MenuItemContainerRule)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemContaineRules(
    options: UseMenuItemContainerRulesOptions = {}
) {
    return useGenericEntity<MenuItemContainerRule>(
        {
            endpoint: "/menu-item-container-rules",
            defaultSortKey: "validItem",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "rules",
            createPropertyName: "createRule",
            updatePropertyName: "updateRule",
            deletePropertyName: "deleteRule",
        },
        options
    );
}
