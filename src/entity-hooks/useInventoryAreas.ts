import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type InventoryArea = components["schemas"]["InventoryArea"];

export function useInventoryAreas(relations: (keyof InventoryArea)[] = []) {
    const [sortKey, setSortKey] = useState<keyof InventoryArea>("areaName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-areas",
        {
            query: {
                relations,
                sortBy: sortKey,
                sortOrder: sortDirection,
            },
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/inventory-areas"],
        });

    const createArea = $api.useMutation("post", "/inventory-areas", {
        onSuccess: refresh,
    });

    const updateArea = $api.useMutation("patch", "/inventory-areas/{id}", {
        onSuccess: refresh,
    });

    const deleteArea = $api.useMutation("delete", "/inventory-areas/{id}", {
        onSuccess: refresh,
    });

    return {
        areas: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createArea,
        updateArea,
        deleteArea,
    };
}
