import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Order = components["schemas"]["Order"];

export interface UseOrdersOptions {
    relations?: (keyof Order)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof Order;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    filters?: string[];
    dateBy?: string;
    startDate?: string;
    endDate?: string;
}

export function useOrders(options: UseOrdersOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof Order>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [filters, setFilters] = useState<string[] | undefined>(undefined);
    const [dateBy, setDateBy] = useState<string | undefined>(options.dateBy);
    const [startDate, setStartDate] = useState<string | undefined>(
        options.startDate
    );
    const [endDate, setEndDate] = useState<string | undefined>(options.endDate);

    const { data, isLoading, error } = $api.useQuery("get", "/orders", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
                search,
                filters,
                relations,
                limit,
                offset,
                dateBy,
                startDate,
                endDate,
            },
        },
    });

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({ queryKey: ["get", "/orders"] });

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
        dateBy,
        setDateBy,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        createOrder,
        updateOrder,
        deleteOrder,
    };
}
