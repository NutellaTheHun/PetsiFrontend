import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItemSize = components["schemas"]["InventoryItemSize"];

export interface UseInventoryItemSizesOptions {
    relations?: (keyof InventoryItemSize)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof InventoryItemSize;
    sortOrder?: "ASC" | "DESC";
}

export function useInventoryItemSizes(
    options: UseInventoryItemSizesOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof InventoryItemSize>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-item-sizes",
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
            queryKey: ["get", "/inventory-item-sizes"],
        });

    const updateInventoryItemSize = $api.useMutation(
        "patch",
        "/inventory-item-sizes/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteInventoryItemSize = $api.useMutation(
        "delete",
        "/inventory-item-sizes/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryItemSizes: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        updateInventoryItemSize,
        deleteInventoryItemSize,
    };
}
