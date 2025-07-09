import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { RecipeSubCategory } from "../../entityTypes";

export interface UseRecipeSubCategoriesOptions {
    relations?: (keyof RecipeSubCategory)[];
    limit?: number;
    offset?: string;
}

export function useRecipeSubCategoriesFindAll(
    options: UseRecipeSubCategoriesOptions = {}
) {
    return useEntityFindAll<RecipeSubCategory>(
        {
            endpoint: "/recipe-sub-categories",
            defaultSortKey: "subCategoryName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "recipeSubCategories",
        },
        options
    );
}
