import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemContainerRule } from "../../entityTypes";

export interface UseMenuItemContainerRulesOptions {
    relations?: (keyof MenuItemContainerRule)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemContainerRulesFindAll(
    options: UseMenuItemContainerRulesOptions = {}
) {
    return useEntityFindAll<MenuItemContainerRule>(
        {
            endpoint: "/menu-item-container-rules",
            defaultSortKey: "ruleName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemContainerRules",
        },
        options
    );
}
