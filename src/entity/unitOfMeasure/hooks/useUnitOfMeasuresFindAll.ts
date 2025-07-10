import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { UnitOfMeasure } from "../../entityTypes";

export type UnitOfMeasureSortKey = keyof Pick<
    UnitOfMeasure,
    "name" | "id" | "category"
>;

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
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "unitOfMeasures",
        },
        options
    );
}
