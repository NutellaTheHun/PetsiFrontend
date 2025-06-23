import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

export interface UseInventoryItemVendorsOptions {
    relations?: (keyof InventoryItemVendor)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof InventoryItemVendor;
    sortOrder?: "ASC" | "DESC";
}

export function useInventoryItemVendors(
    options: UseInventoryItemVendorsOptions = {}
) {
    const { relations = [], limit, offset } = options;

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
                    limit,
                    offset,
                },
            },
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/inventory-item-vendors"],
        });

    const createVendor = $api.useMutation("post", "/inventory-item-vendors", {
        onSuccess: refresh,
    });

    const updateVendor = $api.useMutation(
        "patch",
        "/inventory-item-vendors/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteVendor = $api.useMutation(
        "delete",
        "/inventory-item-vendors/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryItemVendors: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createVendor,
        updateVendor,
        deleteVendor,
    };
}
