import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type OrderMenuItem = components["schemas"]["OrderMenuItem"];

export interface UseOrderMenuItemsOptions {
    relations?: (keyof OrderMenuItem)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof OrderMenuItem;
    sortOrder?: "ASC" | "DESC";
}

export function useOrderMenuItems(options: UseOrderMenuItemsOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof OrderMenuItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/order-menu-items",
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
            queryKey: ["get", "/order-menu-items"],
        });

    const updateOrderMenuItem = $api.useMutation(
        "patch",
        "/order-menu-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteOrderMenuItem = $api.useMutation(
        "delete",
        "/order-menu-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        orderMenuItems: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        updateOrderMenuItem,
        deleteOrderMenuItem,
    };
}
