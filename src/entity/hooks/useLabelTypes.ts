import type { components } from "../../api-types";
import { useGenericEntity } from "./useGenericEntity";

type LabelType = components["schemas"]["LabelType"];

export interface UseLabelTypesOptions {
    relations?: (keyof LabelType)[];
    limit?: number;
    offset?: string;
}

export function useLabelTypes(options: UseLabelTypesOptions = {}) {
    return useGenericEntity<LabelType>(
        {
            endpoint: "/label-types",
            defaultSortKey: "labelTypeName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "labelTypes",
            createPropertyName: "createType",
            updatePropertyName: "updateType",
            deletePropertyName: "deleteType",
        },
        options
    );
}
