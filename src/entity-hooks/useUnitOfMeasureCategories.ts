import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type UnitOfMeasureCategory = components["schemas"]["UnitOfMeasureCategory"];

export interface UseUnitOfMeasureCategoriesOptions {
    relations?: (keyof UnitOfMeasureCategory)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof UnitOfMeasureCategory;
    sortOrder?: "ASC" | "DESC";
}

export function useUnitOfMeasureCategories(
    options: UseUnitOfMeasureCategoriesOptions = {}
) {
    const { relations = [], limit, offset } = options;

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
                    limit,
                    offset,
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
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createCategory,
        updateCategory,
        deleteCategory,
    };
}
