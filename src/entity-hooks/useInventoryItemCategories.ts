import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export interface UseInventoryItemCategoriesOptions {
    relations?: (keyof InventoryItemCategory)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof InventoryItemCategory;
    sortOrder?: "ASC" | "DESC";
}

export function useInventoryItemCategories(
    options: UseInventoryItemCategoriesOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] =
        useState<keyof InventoryItemCategory>("categoryName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-item-categories",
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
            queryKey: ["get", "/inventory-item-categories"],
        });

    const createCategory = $api.useMutation(
        "post",
        "/inventory-item-categories",
        {
            onSuccess: refresh,
        }
    );

    const updateCategory = $api.useMutation(
        "patch",
        "/inventory-item-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteCategory = $api.useMutation(
        "delete",
        "/inventory-item-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryItemCategories: data?.items ?? [],
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
