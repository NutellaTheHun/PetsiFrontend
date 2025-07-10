import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { RecipeCategory } from "../../entityTypes";

export type RecipeCategorySortKey = keyof Pick<
    RecipeCategory,
    "categoryName" | "id"
>;

export interface UseRecipeCategoriesOptions {
    relations?: (keyof RecipeCategory)[];
    limit?: number;
    offset?: string;
}

export function useRecipeCategoriesFindAll(
    options: UseRecipeCategoriesOptions = {}
) {
    return useEntityFindAll<RecipeCategory>(
        {
            endpoint: "/recipe-categories",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "recipeCategories",
        },
        options
    );
}
