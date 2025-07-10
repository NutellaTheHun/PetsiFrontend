import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemContainerRule } from "../../entityTypes";

export type MenuItemContainerRuleSortKey = keyof Pick<
    MenuItemContainerRule,
    "validItem" | "id"
>;

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
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemContainerRules",
        },
        options
    );
}
