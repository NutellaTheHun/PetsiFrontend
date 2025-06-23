import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryItemPackage = components["schemas"]["InventoryItemPackage"];

export interface UseInventoryItemPackagesOptions {
    relations?: (keyof InventoryItemPackage)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof InventoryItemPackage;
    sortOrder?: "ASC" | "DESC";
}

export function useInventoryItemPackages(
    options: UseInventoryItemPackagesOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] =
        useState<keyof InventoryItemPackage>("packageName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-item-packages",
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
            queryKey: ["get", "/inventory-item-packages"],
        });

    const createPackage = $api.useMutation("post", "/inventory-item-packages", {
        onSuccess: refresh,
    });

    const updatePackage = $api.useMutation(
        "patch",
        "/inventory-item-packages/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deletePackage = $api.useMutation(
        "delete",
        "/inventory-item-packages/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        inventoryItemPackages: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createPackage,
        updatePackage,
        deletePackage,
    };
}
