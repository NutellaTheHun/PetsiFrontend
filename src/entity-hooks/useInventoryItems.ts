import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItem = components["schemas"]["InventoryItem"];

export function useInventoryItems(relations: (keyof InventoryItem)[] = []) {
    const [sortKey, setSortKey] = useState<keyof InventoryItem>("itemName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-items",
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
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createInventoryItem,
        updateInventoryItem,
        deleteInventoryItem,
    };
}
