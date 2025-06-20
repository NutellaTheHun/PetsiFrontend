import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type User = components["schemas"]["User"];

export function useUsers(relations: (keyof User)[] = []) {
    const [sortKey, setSortKey] = useState<keyof User>("username");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/users", {
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
        queryClient.invalidateQueries({ queryKey: ["get", "/users"] });

    const createUser = $api.useMutation("post", "/users", {
        onSuccess: refresh,
    });
    const updateUser = $api.useMutation("patch", "/users/{id}", {
        onSuccess: refresh,
    });
    const deleteUser = $api.useMutation("delete", "/users/{id}", {
        onSuccess: refresh,
    });

    return {
        users: data?.items ?? [],
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createUser,
        updateUser,
        deleteUser,
    };
}
