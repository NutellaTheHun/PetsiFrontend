import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export function useInventoryAreaItems(
    relations: (keyof InventoryAreaItem)[] = []
) {
    const [sortKey, setSortKey] = useState<keyof InventoryAreaItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-area-items",
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
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateInventoryAreaItem,
        deleteInventoryAreaItem,
    };
}
