import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type OrderMenuItem = components["schemas"]["OrderMenuItem"];

export function useOrderMenuItems(relations: (keyof OrderMenuItem)[] = []) {
    const [sortKey, setSortKey] = useState<keyof OrderMenuItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/order-menu-items",
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
            queryKey: ["get", "/order-menu-items"],
        });

    const updateOrderMenuItem = $api.useMutation(
        "patch",
        "/order-menu-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteOrderMenuItem = $api.useMutation(
        "delete",
        "/order-menu-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        orderMenuItems: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateOrderMenuItem,
        deleteOrderMenuItem,
    };
}
