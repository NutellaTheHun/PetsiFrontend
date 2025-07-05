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
    toUpdateDto: (entity: Partial<TEntity>) => TUpdateDto;
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
    dtoConverter?: DtoConverter<TEntity, TCreateDto, TUpdateDto>;
    // Edit context for updating existing entities
    createEditContext: (
        setEditDto: (dto: Partial<TUpdateDto> | null) => void,
        setEditInstance: (instance: Partial<TEntity> | null) => void,
        editDto: Partial<TUpdateDto> | null,
        editInstance: Partial<TEntity> | null
    ) => TEditContext;
    // Create context for creating new entities
    createCreateContext: (
        setCreateDto: (dto: Partial<TCreateDto> | null) => void,
        setCreateInstance: (instance: Partial<TEntity> | null) => void,
        createDto: Partial<TCreateDto> | null,
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
    editInstance: Partial<TEntity> | null;
    editDto: Partial<TUpdateDto> | null;
    setEditInstance: (instance: Partial<TEntity> | null) => void;
    setEditDto: (dto: Partial<TUpdateDto> | null) => void;
    resetEditValues: () => void;

    // Create state and context for creating
    createContext: TCreateContext;
    createInstance: Partial<TEntity> | null;
    createDto: Partial<TCreateDto> | null;
    setCreateInstance: (instance: Partial<TEntity> | null) => void;
    setCreateDto: (dto: Partial<TCreateDto> | null) => void;
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
    const [editInstance, setEditInstance] = useState<Partial<TEntity> | null>(
        null
    );
    const [editDto, setEditDto] = useState<Partial<TUpdateDto> | null>(null);
    const [createInstance, setCreateInstance] =
        useState<Partial<TEntity> | null>(null); // TODO: fix this, to dto function?
    const [createDto, setCreateDto] = useState<Partial<TCreateDto> | null>(
        null
    );

    const queryClient = useQueryClient();

    // Create contexts using the provided factory functions
    const editContext = config.createEditContext(
        setEditDto,
        setEditInstance,
        editDto,
        editInstance
    );
    const createContext = config.createCreateContext(
        setCreateDto,
        setCreateInstance,
        createDto,
        createInstance
    );

    // Utility functions
    const resetEditValues = () => {
        setEditInstance(null);
        setEditDto(null);
    };
    const resetCreateValues = () => {
        setCreateInstance(null);
        setCreateDto(null);
    };
    const resetAll = () => {
        setEditInstance(null);
        setEditDto(null);
        setCreateInstance(null);
        setCreateDto(null);
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

        if (config.dtoConverter) {
            const createDto = config.dtoConverter.toCreateDto(entity);
            createEntity.mutate({ body: createDto });
        } else {
            // Fallback to using the createDto state if no converter is provided
            createEntity.mutate({ body: createDto });
        }
        resetCreateValues();
    };

    const handleUpdate = (id: number) => {
        if (!editInstance) return;

        if (config.dtoConverter) {
            const updateDto = config.dtoConverter.toUpdateDto(editInstance);
            updateEntity.mutate({
                params: { path: { id } },
                body: updateDto,
            });
        } else {
            // Fallback to using the editDto state if no converter is provided
            updateEntity.mutate({
                params: { path: { id } },
                body: editDto,
            });
        }
        resetEditValues();
    };

    const handleDelete = (id: number) => {
        deleteEntity.mutate({ params: { path: { id } } });
    };

    return {
        editContext,
        editInstance,
        editDto,
        setEditInstance,
        setEditDto,
        resetEditValues,
        createContext,
        createInstance,
        createDto,
        setCreateInstance,
        setCreateDto,
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
