import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type MenuItem = components["schemas"]["MenuItem"];

export interface UseMenuItemsOptions {
    relations?: (keyof MenuItem)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof MenuItem;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    filters?: string[];
}

export function useMenuItems(options: UseMenuItemsOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof MenuItem>("itemName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [filters, setFilters] = useState<string[] | undefined>(undefined);

    const { data, isLoading, error } = $api.useQuery("get", "/menu-items", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
                search,
                filters,
                relations,
                limit,
                offset,
            },
        },
    });

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/menu-items"],
        });

    const createMenuItem = $api.useMutation("post", "/menu-items", {
        onSuccess: refresh,
    });

    const updateMenuItem = $api.useMutation("patch", "/menu-items/{id}", {
        onSuccess: refresh,
    });

    const deleteMenuItem = $api.useMutation("delete", "/menu-items/{id}", {
        onSuccess: refresh,
    });

    return {
        menuItems: data?.items ?? [],
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
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
    };
}
