import type { components } from "../api-types";
import { useGenericEntity } from "./useGenericEntity";

type RecipeCategory = components["schemas"]["RecipeCategory"];

export interface UseRecipeCategoriesOptions {
    relations?: (keyof RecipeCategory)[];
    limit?: number;
    offset?: string;
}

export function useRecipeCategories(options: UseRecipeCategoriesOptions = {}) {
    return useGenericEntity<RecipeCategory>(
        {
            endpoint: "/recipe-categories",
            defaultSortKey: "categoryName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "recipeCategories",
            createPropertyName: "createCategory",
            updatePropertyName: "updateCategory",
            deletePropertyName: "deleteCategory",
        },
        options
    );
}
