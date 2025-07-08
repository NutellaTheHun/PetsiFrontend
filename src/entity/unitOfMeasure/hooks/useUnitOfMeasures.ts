import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

export interface UseUnitOfMeasuresOptions {
    relations?: (keyof UnitOfMeasure)[];
    limit?: number;
    offset?: string;
}

export function useUnitOfMeasures(options: UseUnitOfMeasuresOptions = {}) {
    return useGenericEntity<UnitOfMeasure>(
        {
            endpoint: "/units-of-measure",
            defaultSortKey: "name",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "unitOfMeasures",
            createPropertyName: "createUnitOfMeasure",
            updatePropertyName: "updateUnitOfMeasure",
            deletePropertyName: "deleteUnitOfMeasure",
        },
        options
    );
}
