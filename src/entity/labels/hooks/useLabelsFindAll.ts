import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Label } from "../../entityTypes";

export interface UseLabelsOptions {
    relations?: (keyof Label)[];
    limit?: number;
    offset?: string;
}

export function useLabelsFindAll(options: UseLabelsOptions = {}) {
    return useEntityFindAll<Label>(
        {
            endpoint: "/labels",
            defaultSortKey: "labelName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "labels",
        },
        options
    );
}
