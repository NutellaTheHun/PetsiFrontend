import type { components } from "../../../api-types";
import { useGenericEntity } from "../useGenericEntity";

type RecipeIngredient = components["schemas"]["RecipeIngredient"];

export interface UseRecipeIngredientsOptions {
    relations?: (keyof RecipeIngredient)[];
    limit?: number;
    offset?: string;
}

export function useRecipeIngredients(
    options: UseRecipeIngredientsOptions = {}
) {
    return useGenericEntity<RecipeIngredient>(
        {
            endpoint: "/recipe-ingredients",
            defaultSortKey: "id",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "recipeIngredients",
            createPropertyName: "createIngredient",
            updatePropertyName: "updateIngredient",
            deletePropertyName: "deleteIngredient",
        },
        options
    );
}
