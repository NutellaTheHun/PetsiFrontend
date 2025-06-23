import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItem = components["schemas"]["InventoryItem"];

export interface UseInventoryItemsOptions {
    relations?: (keyof InventoryItem)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof InventoryItem;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    filters?: string[];
}

export function useInventoryItems(options: UseInventoryItemsOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof InventoryItem>("itemName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [filters, setFilters] = useState<string[] | undefined>(undefined);

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-items",
        {
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
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/inventory-items"],
        });

    const createInventoryItem = $api.useMutation("post", "/inventory-items", {
        onSuccess: refresh,
    });

    const updateInventoryItem = $api.useMutation(
        "patch",
        "/inventory-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteInventoryItem = $api.useMutation(
        "delete",
        "/inventory-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryItems: data?.items ?? [],
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
        createInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
    };
}
