import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Recipe } from "../../entityTypes";

export type RecipeSortKey = keyof Pick<
    Recipe,
    "recipeName" | "id" | "category" | "subCategory"
>;

export interface UseRecipesOptions {
    relations?: (keyof Recipe)[];
    selectedCategoryId?: number | null;
    selectedSubCategoryId?: number | null;
    limit?: number;
    offset?: string;
}

export function useRecipesFindAll(options: UseRecipesOptions = {}) {
    return useEntityFindAll<Recipe, RecipeSortKey, UseRecipesOptions>(
        {
            endpoint: "/recipes",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            supportsSearch: true,
            supportsFilters: true,
            itemsPropertyName: "recipes",
            customQueryParams: (options, dynamicParams) => {
                const queryParams: any = {
                    sortBy: dynamicParams.sortBy,
                    sortOrder: dynamicParams.sortOrder,
                    relations: options.relations,
                };

                if (options.selectedCategoryId) {
                    queryParams.filters = [
                        `category,${options.selectedCategoryId}`,
                    ];
                }

                if (options.selectedSubCategoryId) {
                    queryParams.filters = [
                        `subCategory,${options.selectedSubCategoryId}`,
                    ];
                }

                return queryParams;
            },
        },
        options
    );
}
