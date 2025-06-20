import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type UnitOfMeasureCategory = components["schemas"]["UnitOfMeasureCategory"];

export function useUnitOfMeasureCategories(
    relations: (keyof UnitOfMeasureCategory)[] = []
) {
    const [sortKey, setSortKey] =
        useState<keyof UnitOfMeasureCategory>("categoryName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/unit-of-measure-categories",
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
            queryKey: ["get", "/unit-of-measure-categories"],
        });

    const createCategory = $api.useMutation(
        "post",
        "/unit-of-measure-categories",
        {
            onSuccess: refresh,
        }
    );

    const updateCategory = $api.useMutation(
        "patch",
        "/unit-of-measure-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteCategory = $api.useMutation(
        "delete",
        "/unit-of-measure-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        categories: data?.items ?? [],
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
