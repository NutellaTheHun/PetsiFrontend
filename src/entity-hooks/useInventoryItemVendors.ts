import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

export function useInventoryItemVendors(
    relations: (keyof InventoryItemVendor)[] = []
) {
    const [sortKey, setSortKey] = useState<keyof InventoryItemVendor>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-item-vendors",
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
            queryKey: ["get", "/inventory-item-vendors"],
        });

    const updateInventoryItemVendor = $api.useMutation(
        "patch",
        "/inventory-item-vendors/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteInventoryItemVendor = $api.useMutation(
        "delete",
        "/inventory-item-vendors/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryItemVendors: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateInventoryItemVendor,
        deleteInventoryItemVendor,
    };
}
