import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Template = components["schemas"]["Template"];

export function useTemplates(relations: (keyof Template)[] = []) {
    const [sortKey, setSortKey] = useState<keyof Template>("templateName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/templates", {
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
            queryKey: ["get", "/templates"],
        });

    const createTemplate = $api.useMutation("post", "/templates", {
        onSuccess: refresh,
    });

    const updateTemplate = $api.useMutation("patch", "/templates/{id}", {
        onSuccess: refresh,
    });

    const deleteTemplate = $api.useMutation("delete", "/templates/{id}", {
        onSuccess: refresh,
    });

    return {
        templates: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createTemplate,
        updateTemplate,
        deleteTemplate,
    };
}
