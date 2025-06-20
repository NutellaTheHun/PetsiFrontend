import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type OrderCategory = components["schemas"]["OrderCategory"];

export function useOrderCategories(relations: (keyof OrderCategory)[] = []) {
    const [sortKey, setSortKey] = useState<keyof OrderCategory>("categoryName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/order-categories",
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
            queryKey: ["get", "/order-categories"],
        });

    const createCategory = $api.useMutation("post", "/order-categories", {
        onSuccess: refresh,
    });

    const updateCategory = $api.useMutation("patch", "/order-categories/{id}", {
        onSuccess: refresh,
    });

    const deleteCategory = $api.useMutation(
        "delete",
        "/order-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        orderCategories: data?.items ?? [],
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
