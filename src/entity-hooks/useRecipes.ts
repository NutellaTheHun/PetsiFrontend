import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Recipe = components["schemas"]["Recipe"];

export interface UseRecipesOptions {
    relations?: (keyof Recipe)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof Recipe;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    filters?: string[];
}

export function useRecipes(options: UseRecipesOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof Recipe>("recipeName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [filters, setFilters] = useState<string[] | undefined>(undefined);

    const { data, isLoading, error } = $api.useQuery("get", "/recipes", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
                search,
                filters,
                relations,
                limit,
                offset,
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
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        search,
        setSearch,
        filters,
        setFilters,
        createRecipe,
        updateRecipe,
        deleteRecipe,
    };
}
