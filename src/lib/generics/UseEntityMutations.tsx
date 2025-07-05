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
        setEditDto: (dto: Partial<TUpdateDto>) => void,
        setEditInstance: (instance: Partial<TEntity>) => void,
        editDto: Partial<TUpdateDto>,
        editInstance: Partial<TEntity> | null
    ) => TEditContext;
    // Create context for creating new entities
    createCreateContext: (
        setCreateDto: (dto: Partial<TCreateDto>) => void,
        setCreateInstance: (instance: Partial<TEntity>) => void,
        createDto: Partial<TCreateDto>,
        createInstance: Partial<TEntity>
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
    editDto: Partial<TUpdateDto>;
    setEditInstance: (instance: Partial<TEntity> | null) => void;
    setEditDto: (dto: Partial<TUpdateDto>) => void;
    resetEditValues: () => void;

    // Create state and context for creating
    createContext: TCreateContext;
    createInstance: Partial<TEntity>;
    createDto: Partial<TCreateDto>;
    setCreateInstance: (instance: Partial<TEntity>) => void;
    setCreateDto: (dto: Partial<TCreateDto>) => void;
    resetCreateValues: () => void;

    // Utility functions
    resetAll: () => void;

    // Encapsulated CRUD operations - now use internal state
    handleAdd: () => void;
    handleUpdate: () => void;
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
    const [editDto, setEditDto] = useState<Partial<TUpdateDto>>(
        {} as Partial<TUpdateDto>
    );
    const [createInstance, setCreateInstance] = useState<Partial<TEntity>>(
        {} as Partial<TEntity>
    );
    const [createDto, setCreateDto] = useState<Partial<TCreateDto>>(
        {} as Partial<TCreateDto>
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
        setEditDto({} as Partial<TUpdateDto>);
    };
    const resetCreateValues = () => {
        setCreateInstance({} as Partial<TEntity>);
        setCreateDto({} as Partial<TCreateDto>);
    };
    const resetAll = () => {
        setEditInstance(null);
        setEditDto({} as Partial<TUpdateDto>);
        setCreateInstance({} as Partial<TEntity>);
        setCreateDto({} as Partial<TCreateDto>);
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
    const handleAdd = () => {
        if (!createInstance) return;

        if (config.dtoConverter) {
            const createDto = config.dtoConverter.toCreateDto(createInstance);
            createEntity.mutate({ body: createDto });
        } else {
            // Fallback to using the createDto state if no converter is provided
            createEntity.mutate({ body: createDto });
        }
        resetCreateValues();
    };

    const handleUpdate = () => {
        if (!editInstance) return;

        if (config.dtoConverter) {
            const updateDto = config.dtoConverter.toUpdateDto(editInstance);
            updateEntity.mutate({
                params: { path: { id: editInstance.id } },
                body: updateDto,
            });
        } else {
            // Fallback to using the editDto state if no converter is provided
            updateEntity.mutate({
                params: { path: { id: editInstance.id } },
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
