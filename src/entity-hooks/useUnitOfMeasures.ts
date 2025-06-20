import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

export function useUnitOfMeasures(relations: (keyof UnitOfMeasure)[] = []) {
    const [sortKey, setSortKey] = useState<keyof UnitOfMeasure>("name");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/units-of-measure",
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
            queryKey: ["get", "/units-of-measure"],
        });

    const createUnitOfMeasure = $api.useMutation("post", "/units-of-measure", {
        onSuccess: refresh,
    });

    const updateUnitOfMeasure = $api.useMutation(
        "patch",
        "/units-of-measure/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteUnitOfMeasure = $api.useMutation(
        "delete",
        "/units-of-measure/{id}",
        {
            onSuccess: refresh,
        }
    );

    return {
        unitOfMeasures: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createUnitOfMeasure,
        updateUnitOfMeasure,
        deleteUnitOfMeasure,
    };
}
