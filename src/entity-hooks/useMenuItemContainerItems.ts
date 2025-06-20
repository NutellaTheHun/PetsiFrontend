import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type MenuItemContainerItem = components["schemas"]["MenuItemContainerItem"];

export function useMenuItemContainerItems(
    relations: (keyof MenuItemContainerItem)[] = []
) {
    const [sortKey, setSortKey] = useState<keyof MenuItemContainerItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/menu-item-container-items",
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
            queryKey: ["get", "/menu-item-container-items"],
        });

    const updateMenuItemContainerItem = $api.useMutation(
        "patch",
        "/menu-item-container-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteMenuItemContainerItem = $api.useMutation(
        "delete",
        "/menu-item-container-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        menuItemContainerItems: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateMenuItemContainerItem,
        deleteMenuItemContainerItem,
    };
}
