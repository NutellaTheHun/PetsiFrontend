import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type RecipeIngredient = components["schemas"]["RecipeIngredient"];

export function useRecipeIngredients(
    relations: (keyof RecipeIngredient)[] = []
) {
    const [sortKey, setSortKey] = useState<keyof RecipeIngredient>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/recipe-ingredients",
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
            queryKey: ["get", "/recipe-ingredients"],
        });

    const updateRecipeIngredient = $api.useMutation(
        "patch",
        "/recipe-ingredients/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteRecipeIngredient = $api.useMutation(
        "delete",
        "/recipe-ingredients/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        recipeIngredients: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateRecipeIngredient,
        deleteRecipeIngredient,
    };
}
