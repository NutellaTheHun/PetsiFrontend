import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Label = components["schemas"]["Label"];

export function useLabels(relations: (keyof Label)[] = []) {
    const [sortKey, setSortKey] = useState<keyof Label>("id");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");

    const { data, isLoading, error } = $api.useQuery("get", "/labels", {
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
            queryKey: ["get", "/labels"],
        });

    const createLabel = $api.useMutation("post", "/labels", {
        onSuccess: refresh,
    });

    const updateLabel = $api.useMutation("patch", "/labels/{id}", {
        onSuccess: refresh,
    });

    const deleteLabel = $api.useMutation("delete", "/labels/{id}", {
        onSuccess: refresh,
    });

    return {
        labels: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createLabel,
        updateLabel,
        deleteLabel,
    };
}
