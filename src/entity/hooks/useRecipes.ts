import type { components } from "../../api-types";
import { useGenericEntity } from "./useGenericEntity";

type Recipe = components["schemas"]["Recipe"];

export interface UseRecipesOptions {
    relations?: (keyof Recipe)[];
    limit?: number;
    offset?: string;
}

export function useRecipes(options: UseRecipesOptions = {}) {
    return useGenericEntity<Recipe>(
        {
            endpoint: "/recipes",
            defaultSortKey: "recipeName",
            defaultSortDirection: "ASC",
            supportsSearch: true,
            supportsFilters: true,
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "recipes",
            createPropertyName: "createRecipe",
            updatePropertyName: "updateRecipe",
            deletePropertyName: "deleteRecipe",
        },
        options
    );
}
