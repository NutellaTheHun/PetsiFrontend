import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type MenuItemCategory = components["schemas"]["MenuItemCategory"];

export interface UseMenuItemCategoriesOptions {
    relations?: (keyof MenuItemCategory)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof MenuItemCategory;
    sortOrder?: "ASC" | "DESC";
}

export function useMenuItemCategories(
    options: UseMenuItemCategoriesOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] =
        useState<keyof MenuItemCategory>("categoryName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/menu-item-categories",
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
            queryKey: ["get", "/menu-item-categories"],
        });

    const createCategory = $api.useMutation("post", "/menu-item-categories", {
        onSuccess: refresh,
    });

    const updateCategory = $api.useMutation(
        "patch",
        "/menu-item-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteCategory = $api.useMutation(
        "delete",
        "/menu-item-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        menuItemCategories: data?.items ?? [],
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
