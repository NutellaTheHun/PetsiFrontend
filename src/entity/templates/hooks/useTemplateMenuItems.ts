import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type TemplateMenuItem = components["schemas"]["TemplateMenuItem"];

export interface UseTemplateMenuItemsOptions {
    relations?: (keyof TemplateMenuItem)[];
    limit?: number;
    offset?: string;
}

export function useTemplateMenuItems(
    options: UseTemplateMenuItemsOptions = {}
) {
    return useGenericEntity<TemplateMenuItem>(
        {
            endpoint: "/template-menu-items",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "templateMenuItems",
            createPropertyName: "createTemplateMenuItem",
            updatePropertyName: "updateTemplateMenuItem",
            deletePropertyName: "deleteTemplateMenuItem",
        },
        options
    );
}
