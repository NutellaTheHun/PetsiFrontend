import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { TemplateMenuItem } from "../../entityTypes";

export interface UseTemplateMenuItemsOptions {
    relations?: (keyof TemplateMenuItem)[];
    limit?: number;
    offset?: string;
}

export function useTemplateMenuItemsFindAll(
    options: UseTemplateMenuItemsOptions = {}
) {
    return useEntityFindAll<TemplateMenuItem>(
        {
            endpoint: "/template-menu-items",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "templateMenuItems",
        },
        options
    );
}
