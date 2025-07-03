import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { $api } from "../app-client";

// Base types for any entity
export interface BaseEntity {
    id: number;
}

// Generic DTO types
export interface BaseCreateDto {}
export interface BaseUpdateDto {}

// Generic context types
export interface BaseEditContext {}
export interface BaseCreateContext {}

// Configuration for entity mutations
export interface EntityMutationsConfig<
    TEntity extends BaseEntity,
    TCreateDto extends BaseCreateDto,
    TUpdateDto extends BaseUpdateDto,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    endpoint: string;
    // Edit context for updating existing entities
    createEditContext: (
        setEditValues: (values: Partial<TUpdateDto> | null) => void,
        setEditInstance: (instance: TEntity | null) => void,
        editValues: Partial<TUpdateDto> | null,
        editInstance: TEntity | null
    ) => TEditContext;
    // Create context for creating new entities
    createCreateContext: (
        setCreateValues: (values: Partial<TCreateDto> | null) => void,
        setCreateInstance: (instance: Partial<TEntity> | null) => void,
        createValues: Partial<TCreateDto> | null,
        createInstance: Partial<TEntity> | null
    ) => TCreateContext;
}

// Return type for the generic mutations hook
export interface UseEntityMutationsReturn<
    TEntity extends BaseEntity,
    TCreateDto extends BaseCreateDto,
    TUpdateDto extends BaseUpdateDto,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    // Edit state and context for updating
    editContext: TEditContext;
    editInstance: TEntity | null;
    setEditInstance: (instance: TEntity | null) => void;
    resetEditValues: () => void;

    // Create state and context for creating
    createContext: TCreateContext;
    createInstance: Partial<TEntity> | null;
    setCreateInstance: (instance: Partial<TEntity> | null) => void;
    resetCreateValues: () => void;

    // Utility functions
    resetAll: () => void;

    // Mutations
    createEntity: any;
    updateEntity: any;
    deleteEntity: any;
}

export function useEntityMutations<
    TEntity extends BaseEntity,
    TCreateDto extends BaseCreateDto,
    TUpdateDto extends BaseUpdateDto,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
>(
    config: EntityMutationsConfig<
        TEntity,
        TCreateDto,
        TUpdateDto,
        TEditContext,
        TCreateContext
    >
): UseEntityMutationsReturn<
    TEntity,
    TCreateDto,
    TUpdateDto,
    TEditContext,
    TCreateContext
> {
    const [editValues, setEditValues] = useState<Partial<TUpdateDto> | null>(
        null
    );
    const [editInstance, setEditInstance] = useState<TEntity | null>(null);
    const [createValues, setCreateValues] =
        useState<Partial<TCreateDto> | null>(null);
    const [createInstance, setCreateInstance] =
        useState<Partial<TEntity> | null>(null);

    const queryClient = useQueryClient();

    // Create contexts using the provided factory functions
    const editContext = config.createEditContext(
        setEditValues,
        setEditInstance,
        editValues,
        editInstance
    );
    const createContext = config.createCreateContext(
        setCreateValues,
        setCreateInstance,
        createValues,
        createInstance
    );

    // Utility functions
    const resetEditValues = () => {
        setEditValues(null);
        setEditInstance(null);
    };
    const resetCreateValues = () => {
        setCreateValues(null);
        setCreateInstance(null);
    };
    const resetAll = () => {
        setEditValues(null);
        setEditInstance(null);
        setCreateValues(null);
        setCreateInstance(null);
    };

    // Refresh function for query invalidation
    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", config.endpoint],
        });

    // Mutations with query invalidation
    const createEntity = $api.useMutation("post", config.endpoint as any, {
        onSuccess: refresh,
    });
    const updateEntity = $api.useMutation(
        "patch",
        `${config.endpoint}/{id}` as any,
        {
            onSuccess: refresh,
        }
    );
    const deleteEntity = $api.useMutation(
        "delete",
        `${config.endpoint}/{id}` as any,
        {
            onSuccess: refresh,
        }
    );

    return {
        editContext,
        editInstance,
        setEditInstance,
        resetEditValues,
        createContext,
        createInstance,
        setCreateInstance,
        resetCreateValues,
        resetAll,
        createEntity,
        updateEntity,
        deleteEntity,
    };
}
