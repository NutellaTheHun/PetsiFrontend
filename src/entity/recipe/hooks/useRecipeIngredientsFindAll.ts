import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { RecipeIngredient } from "../../entityTypes";

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
            defaultSortKey: "ingredient",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "recipeIngredients",
        },
        options
    );
}
