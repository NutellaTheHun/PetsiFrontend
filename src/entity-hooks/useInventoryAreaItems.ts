import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export interface UseInventoryAreaItemsOptions {
    relations?: (keyof InventoryAreaItem)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof InventoryAreaItem;
    sortOrder?: "ASC" | "DESC";
    search?: string;
}

export function useInventoryAreaItems(
    options: UseInventoryAreaItemsOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof InventoryAreaItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
    const [search, setSearch] = useState<string | undefined>(undefined);

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-area-items",
        {
            params: {
                query: {
                    sortBy: sortKey,
                    sortOrder: sortDirection,
                    relations,
                    limit,
                    offset,
                    search,
                },
            },
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/inventory-area-items"],
        });

    const updateInventoryAreaItem = $api.useMutation(
        "patch",
        "/inventory-area-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteInventoryAreaItem = $api.useMutation(
        "delete",
        "/inventory-area-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryAreaItems: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateInventoryAreaItem,
        deleteInventoryAreaItem,
        search,
        setSearch,
    };
}
