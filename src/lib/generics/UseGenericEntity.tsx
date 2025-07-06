import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { $api } from "../../lib/app-client";

export type SortDirection = "ASC" | "DESC";
export const SORT_DIRECTION: Record<SortDirection, SortDirection> = {
    ASC: "ASC" as SortDirection,
    DESC: "DESC",
};

export type SortParams<TSortKey extends string> = {
    sortBy: TSortKey;
    sortDirection: SortDirection;
};

// Base interface for common query parameters
export interface BaseQueryParams {
    relations?: string[];
    limit?: number;
    offset?: string;
    sortBy?: string;
    sortOrder?: "ASC" | "DESC";
    search?: string;
    filters?: string[];
}

// Extended interface for entities that support date filtering
export interface DateQueryParams extends BaseQueryParams {
    startDate?: string;
    endDate?: string;
    dateBy?: string;
}

// Generic options interface that can be extended
export interface UseGenericEntityOptions<
    T extends BaseQueryParams = BaseQueryParams
> {
    relations?: string[];
    limit?: number;
    offset?: string;
    // Allow additional properties from the extended interface
    [key: string]: any;
}

// Return type for the generic hook
export interface UseGenericEntityReturn<
    T,
    TSortKey extends string = string,
    TOptions extends BaseQueryParams = BaseQueryParams
> {
    items: T[];
    nextCursor?: string;
    isLoading: boolean;
    error: any;

    // Sorting
    sortKey: TSortKey;
    setSortKey: (key: TSortKey) => void;
    sortDirection: "ASC" | "DESC";
    setSortDirection: (direction: "ASC" | "DESC") => void;

    // Searching and filtering
    search?: string;
    setSearch?: (search: string | undefined) => void;
    filters?: string[];
    setFilters?: (filters: string[] | undefined) => void;

    // Date filtering (optional)
    startDate?: string;
    setStartDate?: (date: string | undefined) => void;
    endDate?: string;
    setEndDate?: (date: string | undefined) => void;
    dateBy?: string;
    setDateBy?: (dateBy: string | undefined) => void;

    // CRUD operations
    createItem?: any;
    updateItem?: any;
    deleteItem?: any;

    // Additional operations
    [key: string]: any;
}

// Configuration for entity-specific behavior
export interface EntityConfig<
    T,
    TSortKey extends string = string,
    TOptions extends BaseQueryParams = BaseQueryParams
> {
    endpoint: string;
    defaultSortKey: TSortKey;
    defaultSortDirection?: "ASC" | "DESC";
    supportsSearch?: boolean;
    supportsFilters?: boolean;
    supportsDateFiltering?: boolean;
    supportsCreate?: boolean;
    supportsUpdate?: boolean;
    supportsDelete?: boolean;
    customQueryParams?: (options: TOptions, dynamicParams: any) => any;
    customReturnValues?: (data: any, mutations: any, dynamicState: any) => any;
    // Custom property names for the return object
    itemsPropertyName?: string;
    createPropertyName?: string;
    updatePropertyName?: string;
    deletePropertyName?: string;
}

export function useGenericEntity<
    T,
    TSortKey extends string = string,
    TOptions extends BaseQueryParams = BaseQueryParams
>(
    config: EntityConfig<T, TSortKey, TOptions>,
    options: UseGenericEntityOptions<TOptions> = {}
): UseGenericEntityReturn<T, TSortKey, TOptions> {
    const { relations = [], limit, offset } = options;

    // Dynamic state management
    const [sortKey, setSortKey] = useState<TSortKey>(config.defaultSortKey);
    const [sortDirection, setSortDirection] = useState<SortDirection>(
        config.defaultSortDirection || SORT_DIRECTION.ASC
    );

    const [search, setSearch] = useState<string | undefined>(
        config.supportsSearch ? undefined : undefined
    );

    const [filters, setFilters] = useState<string[] | undefined>(
        config.supportsFilters ? undefined : undefined
    );

    const [startDate, setStartDate] = useState<string | undefined>(
        config.supportsDateFiltering ? (options as any).startDate : undefined
    );

    const [endDate, setEndDate] = useState<string | undefined>(
        config.supportsDateFiltering ? (options as any).endDate : undefined
    );

    const [dateBy, setDateBy] = useState<string | undefined>(
        config.supportsDateFiltering ? (options as any).dateBy : undefined
    );

    // Build query parameters
    const baseQueryParams: any = {
        sortBy: sortKey,
        sortOrder: sortDirection,
        relations,
        limit,
        offset,
    };

    if (config.supportsSearch && search !== undefined) {
        baseQueryParams.search = search;
    }

    if (config.supportsFilters && filters !== undefined) {
        baseQueryParams.filters = filters;
    }

    if (config.supportsDateFiltering) {
        if (startDate !== undefined) baseQueryParams.startDate = startDate;
        if (endDate !== undefined) baseQueryParams.endDate = endDate;
        if (dateBy !== undefined) baseQueryParams.dateBy = dateBy;
    }

    // Allow custom query parameter modification
    const queryParams = config.customQueryParams
        ? config.customQueryParams(options as TOptions, {
              sortBy: sortKey,
              sortOrder: sortDirection,
              search,
              filters,
              startDate,
              endDate,
              dateBy,
              relations,
          })
        : baseQueryParams;

    const { data, isLoading, error } = $api.useQuery(
        "get",
        config.endpoint as any,
        {
            params: {
                query: queryParams,
            },
        }
    );

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", config.endpoint],
        });

    // CRUD mutations
    const mutations: any = {};

    if (config.supportsCreate) {
        mutations.createItem = $api.useMutation(
            "post",
            config.endpoint as any,
            {
                onSuccess: refresh,
            }
        );
    }

    if (config.supportsUpdate) {
        mutations.updateItem = $api.useMutation(
            "patch",
            `${config.endpoint}/{id}` as any,
            {
                onSuccess: refresh,
            }
        );
    }

    if (config.supportsDelete) {
        mutations.deleteItem = $api.useMutation(
            "delete",
            `${config.endpoint}/{id}` as any,
            {
                onSuccess: refresh,
            }
        );
    }

    // Dynamic state for return
    const dynamicState: any = {
        sortKey,
        setSortKey: setSortKey as (key: TSortKey) => void,
        sortDirection,
        setSortDirection,
    };

    if (config.supportsSearch) {
        dynamicState.search = search;
        dynamicState.setSearch = setSearch;
    }

    if (config.supportsFilters) {
        dynamicState.filters = filters;
        dynamicState.setFilters = setFilters;
    }

    if (config.supportsDateFiltering) {
        dynamicState.startDate = startDate;
        dynamicState.setStartDate = setStartDate;
        dynamicState.endDate = endDate;
        dynamicState.setEndDate = setEndDate;
        dynamicState.dateBy = dateBy;
        dynamicState.setDateBy = setDateBy;
    }

    // Extract items and nextCursor from the response data
    const responseData = data as any;
    const items = responseData?.items ?? [];
    const nextCursor = responseData?.nextCursor;

    // Build return object with custom property names
    const returnObj: any = {
        [config.itemsPropertyName || "items"]: items,
        nextCursor,
        isLoading,
        error,
        ...dynamicState,
    };

    // Add CRUD operations with custom names
    if (config.supportsCreate) {
        returnObj[config.createPropertyName || "createItem"] =
            mutations.createItem;
    }

    if (config.supportsUpdate) {
        returnObj[config.updatePropertyName || "updateItem"] =
            mutations.updateItem;
    }

    if (config.supportsDelete) {
        returnObj[config.deletePropertyName || "deleteItem"] =
            mutations.deleteItem;
    }

    // Allow custom return value modification
    return config.customReturnValues
        ? config.customReturnValues(data, mutations, dynamicState)
        : returnObj;
}
