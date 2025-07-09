import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { LabelType } from "../../entityTypes";

export interface UseLabelTypesOptions {
    relations?: (keyof LabelType)[];
    limit?: number;
    offset?: string;
}

export function useLabelTypesFindAll(options: UseLabelTypesOptions = {}) {
    return useEntityFindAll<LabelType>(
        {
            endpoint: "/label-types",
            defaultSortKey: "typeName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "labelTypes",
        },
        options
    );
}
