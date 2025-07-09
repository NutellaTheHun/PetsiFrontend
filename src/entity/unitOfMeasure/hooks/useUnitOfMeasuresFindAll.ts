import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { UnitOfMeasure } from "../../entityTypes";

export interface UseUnitOfMeasuresOptions {
    relations?: (keyof UnitOfMeasure)[];
    limit?: number;
    offset?: string;
}

export function useUnitOfMeasuresFindAll(
    options: UseUnitOfMeasuresOptions = {}
) {
    return useEntityFindAll<UnitOfMeasure>(
        {
            endpoint: "/units-of-measure",
            defaultSortKey: "unitName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "unitOfMeasures",
        },
        options
    );
}
