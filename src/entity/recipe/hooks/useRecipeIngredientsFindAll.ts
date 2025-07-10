import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { RecipeIngredient } from "../../entityTypes";

// Sort by joined ingredientInventoryItem / ingredientRecipe name?
export type RecipeIngredientSortKey = keyof Pick<
    RecipeIngredient,
    "id" | "ingredientInventoryItem" | "ingredientRecipe"
>;

export interface UseRecipeIngredientsOptions {
    relations?: (keyof RecipeIngredient)[];
    limit?: number;
    offset?: string;
}

export function useRecipeIngredientsFindAll(
    options: UseRecipeIngredientsOptions = {}
) {
    return useEntityFindAll<RecipeIngredient>(
        {
            endpoint: "/recipe-ingredients",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "recipeIngredients",
        },
        options
    );
}
