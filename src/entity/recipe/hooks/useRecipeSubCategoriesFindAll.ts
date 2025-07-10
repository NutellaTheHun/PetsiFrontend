import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { RecipeSubCategory } from "../../entityTypes";

export type RecipeSubCategorySortKey = keyof Pick<
    RecipeSubCategory,
    "subCategoryName" | "id"
>;

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
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "recipeSubCategories",
        },
        options
    );
}
