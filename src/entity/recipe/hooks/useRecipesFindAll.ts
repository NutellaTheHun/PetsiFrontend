import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Recipe } from "../../entityTypes";

export interface UseRecipesOptions {
    relations?: (keyof Recipe)[];
    limit?: number;
    offset?: string;
}

export function useRecipesFindAll(options: UseRecipesOptions = {}) {
    return useEntityFindAll<Recipe>(
        {
            endpoint: "/recipes",
            defaultSortKey: "recipeName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "recipes",
        },
        options
    );
}
