import type { components } from "../api-types";
import { useGenericEntity } from "./useGenericEntity";

type Label = components["schemas"]["Label"];

export interface UseLabelsOptions {
    relations?: (keyof Label)[];
    limit?: number;
    offset?: string;
}

export function useLabels(options: UseLabelsOptions = {}) {
    return useGenericEntity<Label>(
        {
            endpoint: "/labels",
            defaultSortKey: "id",
            defaultSortDirection: "DESC",
            supportsSearch: true,
            supportsFilters: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "labels",
            createPropertyName: "createLabel",
            updatePropertyName: "updateLabel",
            deletePropertyName: "deleteLabel",
        },
        options
    );
}
