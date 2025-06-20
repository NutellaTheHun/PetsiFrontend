import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Order = components["schemas"]["Order"];

export function useOrders(relations: (keyof Order)[] = []) {
    const [sortKey, setSortKey] = useState<keyof Order>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

    const { data, isLoading, error } = $api.useQuery("get", "/orders", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
                relations,
            },
        },
    });

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/orders"],
        });

    const createOrder = $api.useMutation("post", "/orders", {
        onSuccess: refresh,
    });

    const updateOrder = $api.useMutation("patch", "/orders/{id}", {
        onSuccess: refresh,
    });

    const deleteOrder = $api.useMutation("delete", "/orders/{id}", {
        onSuccess: refresh,
    });

    return {
        orders: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createOrder,
        updateOrder,
        deleteOrder,
    };
}
