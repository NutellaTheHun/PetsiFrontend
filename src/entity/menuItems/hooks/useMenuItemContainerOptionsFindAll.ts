import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { MenuItemContainerOptions } from "../../entityTypes";

export type MenuItemContainerOptionSortKey = keyof Pick<
    MenuItemContainerOptions,
    "id"
>;

export interface UseMenuItemContainerOptionsOptions {
    relations?: (keyof MenuItemContainerOptions)[];
    limit?: number;
    offset?: string;
}

export function useMenuItemContainerOptionsFindAll(
    options: UseMenuItemContainerOptionsOptions = {}
) {
    return useEntityFindAll<
        MenuItemContainerOptions,
        MenuItemContainerOptionSortKey,
        UseMenuItemContainerOptionsOptions
    >(
        {
            endpoint: "/menu-item-container-options",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "menuItemContainerOptions",
        },
        options
    );
}
