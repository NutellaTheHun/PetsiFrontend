import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Recipe = components["schemas"]["Recipe"];

export function useRecipes(relations: (keyof Recipe)[] = []) {
    const [sortKey, setSortKey] = useState<keyof Recipe>("recipeName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/recipes", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
                relations,
            },
        },
    });

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/recipes"],
        });

    const createRecipe = $api.useMutation("post", "/recipes", {
        onSuccess: refresh,
    });

    const updateRecipe = $api.useMutation("patch", "/recipes/{id}", {
        onSuccess: refresh,
    });

    const deleteRecipe = $api.useMutation("delete", "/recipes/{id}", {
        onSuccess: refresh,
    });

    return {
        recipes: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createRecipe,
        updateRecipe,
        deleteRecipe,
    };
}
