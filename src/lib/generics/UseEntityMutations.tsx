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

// DTO conversion utility types
export interface DtoConverter<
    TEntity extends BaseEntity,
    TCreateDto extends BaseCreateDto,
    TUpdateDto extends BaseUpdateDto
> {
    toCreateDto: (entity: Partial<TEntity>) => TCreateDto;
    toUpdateDto: (entity: TEntity) => TUpdateDto;
}

// Configuration for entity mutations
export interface EntityMutationsConfig<
    TEntity extends BaseEntity,
    TCreateDto extends BaseCreateDto,
    TUpdateDto extends BaseUpdateDto,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    endpoint: string;
    dtoConverter: DtoConverter<TEntity, TCreateDto, TUpdateDto>;
    // Edit context for updating existing entities
    createEditContext: (
        setEditInstance: (instance: TEntity | null) => void,
        editInstance: TEntity | null
    ) => TEditContext;
    // Create context for creating new entities
    createCreateContext: (
        setCreateInstance: (instance: Partial<TEntity> | null) => void,
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

    // Encapsulated CRUD operations
    handleAdd: (entity: Partial<TEntity>) => void;
    handleUpdate: (id: number) => void;
    handleDelete: (id: number) => void;

    // Raw mutations (for advanced use cases)
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
    const [editInstance, setEditInstance] = useState<TEntity | null>(null);
    const [createInstance, setCreateInstance] =
        useState<Partial<TEntity> | null>(null);

    const queryClient = useQueryClient();

    // Create contexts using the provided factory functions
    const editContext = config.createEditContext(setEditInstance, editInstance);
    const createContext = config.createCreateContext(
        setCreateInstance,
        createInstance
    );

    // Utility functions
    const resetEditValues = () => {
        setEditInstance(null);
    };
    const resetCreateValues = () => {
        setCreateInstance(null);
    };
    const resetAll = () => {
        setEditInstance(null);
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

    // Encapsulated CRUD operations
    const handleAdd = (entity: Partial<TEntity>) => {
        if (!entity) return;

        const createDto = config.dtoConverter.toCreateDto(entity);
        createEntity.mutate({ body: createDto });
        resetCreateValues();
    };

    const handleUpdate = (id: number) => {
        if (!editInstance) return;

        const updateDto = config.dtoConverter.toUpdateDto(editInstance);
        updateEntity.mutate({
            params: { path: { id } },
            body: updateDto,
        });
        resetEditValues();
    };

    const handleDelete = (id: number) => {
        deleteEntity.mutate({ params: { path: { id } } });
    };

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
        handleAdd,
        handleUpdate,
        handleDelete,
        createEntity,
        updateEntity,
        deleteEntity,
    };
}
