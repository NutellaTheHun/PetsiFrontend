import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Label } from "../../entityTypes";

export type LabelSortKey = keyof Pick<Label, "labelType" | "id">;

export interface UseLabelsOptions {
    relations?: (keyof Label)[];
    selectedLabelTypeId?: number | null;
    limit?: number;
    offset?: string;
}

export function useLabelsFindAll(options: UseLabelsOptions = {}) {
    return useEntityFindAll<Label, LabelSortKey, UseLabelsOptions>(
        {
            endpoint: "/labels",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "labels",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedLabelTypeId) {
                    queryParams.filters = [
                        `labelType,${options.selectedLabelTypeId}`,
                    ];
                }

                return queryParams;
            },
        },
        options
    );
}
