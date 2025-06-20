import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type LabelType = components["schemas"]["LabelType"];

export function useLabelTypes(relations: (keyof LabelType)[] = []) {
    const [sortKey, setSortKey] = useState<keyof LabelType>("labelTypeName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/label-types", {
        params: {
            query: { sortBy: sortKey, sortOrder: sortDirection, relations },
        },
    });

    const queryClient = useQueryClient();

    const createType = $api.useMutation("post", "/label-types", {
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["get", "/label-types"],
            }),
    });

    const updateType = $api.useMutation("patch", "/label-types/{id}", {
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["get", "/label-types"],
            }),
    });

    const deleteType = $api.useMutation("delete", "/label-types/{id}", {
        onSuccess: () =>
            queryClient.invalidateQueries({
                queryKey: ["get", "/label-types"],
            }),
    });

    return {
        labelTypes: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createType,
        updateType,
        deleteType,
    };
}
