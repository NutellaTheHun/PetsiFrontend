import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type MenuItemSize = components["schemas"]["MenuItemSize"];

export function useMenuItemSizes(relations: (keyof MenuItemSize)[] = []) {
    const [sortKey, setSortKey] = useState<keyof MenuItemSize>("name");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/menu-item-sizes",
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
            queryKey: ["get", "/menu-item-sizes"],
        });

    const createSize = $api.useMutation("post", "/menu-item-sizes", {
        onSuccess: refresh,
    });

    const updateSize = $api.useMutation("patch", "/menu-item-sizes/{id}", {
        onSuccess: refresh,
    });

    const deleteSize = $api.useMutation("delete", "/menu-item-sizes/{id}", {
        onSuccess: refresh,
    });

    return {
        menuItemSizes: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createSize,
        updateSize,
        deleteSize,
    };
}
