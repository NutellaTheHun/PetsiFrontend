import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Template } from "../../entityTypes";

export type TemplateSortKey = keyof Pick<Template, "templateName" | "id">;

export interface UseTemplatesOptions {
    relations?: (keyof Template)[];
    limit?: number;
    offset?: string;
}

export function useTemplatesFindAll(options: UseTemplatesOptions = {}) {
    return useEntityFindAll<Template, TemplateSortKey, UseTemplatesOptions>(
        {
            endpoint: "/templates",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "templates",
        },
        options
    );
}
