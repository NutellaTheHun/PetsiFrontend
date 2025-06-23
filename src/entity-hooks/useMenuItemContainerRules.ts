import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type MenuItemContainerRule = components["schemas"]["MenuItemContainerRule"];

export interface UseMenuItemContainerRulesOptions {
    relations?: (keyof MenuItemContainerRule)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof MenuItemContainerRule;
    sortOrder?: "ASC" | "DESC";
}

export function useMenuItemContaineRules(
    options: UseMenuItemContainerRulesOptions = {}
) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] =
        useState<keyof MenuItemContainerRule>("validItem");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/menu-item-container-rules",
        {
            params: {
                query: {
                    sortBy: sortKey,
                    sortOrder: sortDirection,
                    relations,
                    limit,
                    offset,
                },
            },
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/menu-item-container-rules"],
        });

    const createRule = $api.useMutation("post", "/menu-item-container-rules", {
        onSuccess: refresh,
    });

    const updateRule = $api.useMutation(
        "patch",
        "/menu-item-container-rules/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteRule = $api.useMutation(
        "delete",
        "/menu-item-container-rules/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        rules: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createRule,
        updateRule,
        deleteRule,
    };
}
