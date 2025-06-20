import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];

export function useInventoryAreaCounts(
    relations: (keyof InventoryAreaCount)[] = []
) {
    const [sortKey, setSortKey] = useState<keyof InventoryAreaCount>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-area-counts",
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
            queryKey: ["get", "/inventory-area-counts"],
        });

    const createInventoryAreaCount = $api.useMutation(
        "post",
        "/inventory-area-counts",
        {
            onSuccess: refresh,
        }
    );

    const updateInventoryAreaCount = $api.useMutation(
        "patch",
        "/inventory-area-counts/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteInventoryAreaCount = $api.useMutation(
        "delete",
        "/inventory-area-counts/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryAreaCounts: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createInventoryAreaCount,
        updateInventoryAreaCount,
        deleteInventoryAreaCount,
    };
}
