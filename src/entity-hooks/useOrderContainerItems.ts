import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type OrderContainerItem = components["schemas"]["OrderContainerItem"];

export interface UseOrderContainerItemsOptions {
    relations?: (keyof OrderContainerItem)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof OrderContainerItem;
    sortOrder?: "ASC" | "DESC";
}

export function useOrderContainerItems(
    options: UseOrderContainerItemsOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof OrderContainerItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/order-container-items",
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
            queryKey: ["get", "/order-container-items"],
        });

    const updateOrderContainerItem = $api.useMutation(
        "patch",
        "/order-container-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteOrderContainerItem = $api.useMutation(
        "delete",
        "/order-container-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        orderContainerItems: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        updateOrderContainerItem,
        deleteOrderContainerItem,
    };
}
