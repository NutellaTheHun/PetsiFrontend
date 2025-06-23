import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Template = components["schemas"]["Template"];

export interface UseTemplatesOptions {
    relations?: (keyof Template)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof Template;
    sortOrder?: "ASC" | "DESC";
}

export function useTemplates(options: UseTemplatesOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof Template>("templateName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/templates", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
                relations,
                limit,
                offset,
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
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createTemplate,
        updateTemplate,
        deleteTemplate,
    };
}
