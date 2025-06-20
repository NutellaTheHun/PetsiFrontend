import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type OrderContainerItem = components["schemas"]["OrderContainerItem"];

export function useOrderContainerItems(
    relations: (keyof OrderContainerItem)[] = []
) {
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
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateOrderContainerItem,
        deleteOrderContainerItem,
    };
}
