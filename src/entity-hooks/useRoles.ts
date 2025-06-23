import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../api-types";
import { $api } from "../lib/app-client";

type Role = components["schemas"]["Role"];

export interface UseRolesOptions {
    relations?: (keyof Role)[];
    limit?: number;
    offset?: string;
    sortBy?: keyof Role;
    sortOrder?: "ASC" | "DESC";
}

export function useRoles(options: UseRolesOptions = {}) {
    const { relations = [], limit, offset } = options;

    const [sortKey, setSortKey] = useState<keyof Role>("roleName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/roles", {
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
        queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });

    const createRole = $api.useMutation("post", "/roles", {
        onSuccess: refresh,
    });

    const updateRole = $api.useMutation("patch", "/roles/{id}", {
        onSuccess: refresh,
    });

    const deleteRole = $api.useMutation("delete", "/roles/{id}", {
        onSuccess: refresh,
    });

    return {
        roles: data?.items ?? [],
        nextCursor: data?.nextCursor,
        isLoading,
        error,
        sortKey,
        setSortKey,
        sortDirection,
        setSortDirection,
        createRole,
        updateRole,
        deleteRole,
    };
}
