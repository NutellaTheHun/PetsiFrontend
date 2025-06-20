import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export function useRecipeSubCategories(
    relations: (keyof RecipeSubCategory)[] = []
) {
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
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory,
    };
}
