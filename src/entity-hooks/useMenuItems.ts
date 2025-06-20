import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type MenuItem = components["schemas"]["MenuItem"];

export function useMenuItems(relations: (keyof MenuItem)[] = []) {
    const [sortKey, setSortKey] = useState<keyof MenuItem>("itemName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/menu-items", {
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
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
    };
}
