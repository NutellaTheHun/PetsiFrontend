import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/generics/UseGenericEntity";

type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export interface UseRecipeSubCategoriesOptions {
    relations?: (keyof RecipeSubCategory)[];
    limit?: number;
    offset?: string;
}

export function useRecipeSubCategories(
    options: UseRecipeSubCategoriesOptions = {}
) {
    return useGenericEntity<RecipeSubCategory>(
        {
            endpoint: "/recipe-sub-categories",
            defaultSortKey: "subCategoryName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "recipeSubCategories",
            createPropertyName: "createSubCategory",
            updatePropertyName: "updateSubCategory",
            deletePropertyName: "deleteSubCategory",
        },
        options
    );
}
