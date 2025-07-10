import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { LabelType } from "../../entityTypes";

export type LabelTypeSortKey = keyof Pick<LabelType, "labelTypeName" | "id">;

export interface UseLabelTypesOptions {
    relations?: (keyof LabelType)[];
    limit?: number;
    offset?: string;
}

export function useLabelTypesFindAll(options: UseLabelTypesOptions = {}) {
    return useEntityFindAll<LabelType, LabelTypeSortKey, UseLabelTypesOptions>(
        {
            endpoint: "/label-types",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "labelTypes",
        },
        options
    );
}
