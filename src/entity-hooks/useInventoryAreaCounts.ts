import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];

interface UseInventoryAreaCountsOptions {
    relations?: (keyof InventoryAreaCount)[];
    selectedAreaId?: number | null;
    startDate?: string;
    endDate?: string;
    search?: string;
    limit?: number;
    offset?: string;
}

export function useInventoryAreaCounts(
    options: UseInventoryAreaCountsOptions = {}
) {
    const { relations = [], selectedAreaId, limit, offset } = options;

    const [sortKey, setSortKey] = useState<
        "countDate" | "inventoryArea" | "id"
    >("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

    // Build filters array based on selectedAreaId
    const filters: string[] = [];
    if (selectedAreaId) {
        filters.push(`inventoryArea=${selectedAreaId}`);
    }

    const [search, setSearch] = useState<string | undefined>(undefined);

    const [startDate, setStartDate] = useState<string | undefined>(
        options.startDate
    );
    const [endDate, setEndDate] = useState<string | undefined>(options.endDate);

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-area-counts",
        {
            params: {
                query: {
                    sortBy: sortKey,
                    sortOrder: sortDirection,
                    relations,
                    filters: filters.length > 0 ? filters : undefined,
                    startDate,
                    endDate,
                    search,
                    limit,
                    offset,
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
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createInventoryAreaCount,
        updateInventoryAreaCount,
        deleteInventoryAreaCount,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        search,
        setSearch,
    };
}
