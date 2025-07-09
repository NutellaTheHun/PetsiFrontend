import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Template } from "../../entityTypes";

export interface UseTemplatesOptions {
    relations?: (keyof Template)[];
    limit?: number;
    offset?: string;
}

export function useTemplatesFindAll(options: UseTemplatesOptions = {}) {
    return useEntityFindAll<Template>(
        {
            endpoint: "/templates",
            defaultSortKey: "templateName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "templates",
        },
        options
    );
}
