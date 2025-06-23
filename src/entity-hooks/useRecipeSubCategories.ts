import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export interface UseRecipeSubCategoriesOptions {
    relations?: (keyof RecipeSubCategory)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof RecipeSubCategory;
    sortOrder?: "ASC" | "DESC";
}

export function useRecipeSubCategories(
    options: UseRecipeSubCategoriesOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] =
        useState<keyof RecipeSubCategory>("subCategoryName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/recipe-sub-categories",
        {
            params: {
                query: {
                    sortBy: sortKey,
                    sortOrder: sortDirection,
                    relations,
                    limit,
                    offset,
                },
            },
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/recipe-sub-categories"],
        });

    const createSubCategory = $api.useMutation(
        "post",
        "/recipe-sub-categories",
        {
            onSuccess: refresh,
        }
    );

    const updateSubCategory = $api.useMutation(
        "patch",
        "/recipe-sub-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteSubCategory = $api.useMutation(
        "delete",
        "/recipe-sub-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        recipeSubCategories: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory,
    };
}
