import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type Template = components["schemas"]["Template"];

export interface UseTemplatesOptions {
    relations?: (keyof Template)[];
    limit?: number;
    offset?: string;
}

export function useTemplates(options: UseTemplatesOptions = {}) {
    return useGenericEntity<Template>(
        {
            endpoint: "/templates",
            defaultSortKey: "templateName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "templates",
            createPropertyName: "createTemplate",
            updatePropertyName: "updateTemplate",
            deletePropertyName: "deleteTemplate",
        },
        options
    );
}
