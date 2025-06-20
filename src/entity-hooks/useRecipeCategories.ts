import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type RecipeCategory = components["schemas"]["RecipeCategory"];

export function useRecipeCategories(relations: (keyof RecipeCategory)[] = []) {
    const [sortKey, setSortKey] =
        useState<keyof RecipeCategory>("categoryName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/recipe-categories",
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
            queryKey: ["get", "/recipe-categories"],
        });

    const createCategory = $api.useMutation("post", "/recipe-categories", {
        onSuccess: refresh,
    });

    const updateCategory = $api.useMutation(
        "patch",
        "/recipe-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteCategory = $api.useMutation(
        "delete",
        "/recipe-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        recipeCategories: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}
