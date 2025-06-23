import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type LabelType = components["schemas"]["LabelType"];

export interface UseLabelTypesOptions {
    relations?: (keyof LabelType)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof LabelType;
    sortOrder?: "ASC" | "DESC";
}

export function useLabelTypes(options: UseLabelTypesOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof LabelType>("labelTypeName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/label-types", {
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
            queryKey: ["get", "/label-types"],
        });

    const createType = $api.useMutation("post", "/label-types", {
        onSuccess: refresh,
    });

    const updateType = $api.useMutation("patch", "/label-types/{id}", {
        onSuccess: refresh,
    });

    const deleteType = $api.useMutation("delete", "/label-types/{id}", {
        onSuccess: refresh,
    });

    return {
        labelTypes: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createType,
        updateType,
        deleteType,
    };
}
