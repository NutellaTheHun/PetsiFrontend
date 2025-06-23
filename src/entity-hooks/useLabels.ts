import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Label = components["schemas"]["Label"];

export interface UseLabelsOptions {
    relations?: (keyof Label)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof Label;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    filters?: string[];
}

export function useLabels(options: UseLabelsOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof Label>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
    const [search, setSearch] = useState<string | undefined>(undefined);
    const [filters, setFilters] = useState<string[] | undefined>(undefined);

    const { data, isLoading, error } = $api.useQuery("get", "/labels", {
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
            queryKey: ["get", "/labels"],
        });

    const createLabel = $api.useMutation("post", "/labels", {
        onSuccess: refresh,
    });

    const updateLabel = $api.useMutation("patch", "/labels/{id}", {
        onSuccess: refresh,
    });

    const deleteLabel = $api.useMutation("delete", "/labels/{id}", {
        onSuccess: refresh,
    });

    return {
        labels: data?.items ?? [],
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
        createLabel,
        updateLabel,
        deleteLabel,
    };
}
