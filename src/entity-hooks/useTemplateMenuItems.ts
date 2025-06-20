import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type TemplateMenuItem = components["schemas"]["TemplateMenuItem"];

export function useTemplateMenuItems(
    relations: (keyof TemplateMenuItem)[] = []
) {
    const [sortKey, setSortKey] = useState<keyof TemplateMenuItem>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/template-menu-items",
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
            queryKey: ["get", "/template-menu-items"],
        });

    const updateTemplateMenuItem = $api.useMutation(
        "patch",
        "/template-menu-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteTemplateMenuItem = $api.useMutation(
        "delete",
        "/template-menu-items/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        templateMenuItems: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        updateTemplateMenuItem,
        deleteTemplateMenuItem,
    };
}
