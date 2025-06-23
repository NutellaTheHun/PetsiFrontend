import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type User = components["schemas"]["User"];

export interface UseUsersOptions {
    relations?: (keyof User)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof User;
    sortOrder?: "ASC" | "DESC";
}

export function useUsers(options: UseUsersOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof User>("username");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/users", {
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
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createUser,
        updateUser,
        deleteUser,
    };
}
