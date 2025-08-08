import { useQueryClient } from "@tanstack/react-query";
import isEqual from "fast-deep-equal";
import { useState } from "react";
import { $api } from "../app-client";

export type EntityMutationState = "edit" | "create";

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
    toUpdateDto: (
        originalEntity: Partial<TEntity>,
        editedEntity: Partial<TEntity>
    ) => TUpdateDto;
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
        editInstance: Partial<TEntity> | null,
        setEditInstance: (instance: Partial<TEntity> | null) => void
    ) => TEditContext;
    // Create context for creating new entities
    createCreateContext: (
        createInstance: Partial<TEntity>,
        setCreateInstance: (instance: Partial<TEntity>) => void
    ) => TCreateContext;
}

// Return type for the generic mutations hook
export interface UseEntityMutationsReturn<
    TEntity extends BaseEntity,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    // Edit state and context for updating
    editContext: TEditContext;
    editInstance: Partial<TEntity> | null;
    setEditInstance: (instance: Partial<TEntity> | null) => void;
    resetEditValues: () => void;

    // Create state and context for creating
    createContext: TCreateContext;
    createInstance: Partial<TEntity>;
    setCreateInstance: (instance: Partial<TEntity>) => void;
    resetCreateValues: () => void;

    // Utility functions
    resetAll: () => void;

    // Raw mutations (for advanced use cases)
    createEntity: () => void;
    updateEntity: () => void;
    deleteEntity: (id: number) => void;
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
): UseEntityMutationsReturn<TEntity, TEditContext, TCreateContext> {
    const [editInstance, setEditInstance] = useState<Partial<TEntity> | null>(
        null
    );
    const [originalEditInstance, setOriginalEditInstance] =
        useState<Partial<TEntity> | null>(null);

    const handleSetEditInstance = (instance: Partial<TEntity> | null) => {
        setEditInstance(instance);
        setOriginalEditInstance(instance);
    };

    const [createInstance, setCreateInstance] = useState<Partial<TEntity>>(
        {} as Partial<TEntity>
    );

    const queryClient = useQueryClient();

    // Create contexts using the provided factory functions
    const editContext = config.createEditContext(editInstance, setEditInstance);
    const createContext = config.createCreateContext(
        createInstance,
        setCreateInstance
    );

    // Utility functions
    const resetEditValues = () => {
        setEditInstance(null);
        setOriginalEditInstance(null);
    };
    const resetCreateValues = () => {
        setCreateInstance({} as Partial<TEntity>);
    };
    const resetAll = () => {
        setEditInstance(null);
        setOriginalEditInstance(null);
        setCreateInstance({} as Partial<TEntity>);
    };

    // Refresh function for query invalidation
    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", config.endpoint],
        });

    // Mutations with query invalidation
    const createRequest = $api.useMutation("post", config.endpoint as any, {
        onSuccess: () => {
            refresh();
            resetCreateValues();
        },
    });
    const updateRequest = $api.useMutation(
        "patch",
        `${config.endpoint}/{id}` as any,
        {
            onSuccess: () => {
                refresh();
                resetEditValues();
            },
        }
    );
    const deleteRequest = $api.useMutation(
        "delete",
        `${config.endpoint}/{id}` as any,
        {
            onSuccess: refresh,
        }
    );

    // Exposed mutators
    const createEntity = () => {
        if (!createInstance) return;

        if (config.dtoConverter) {
            const createDto = config.dtoConverter.toCreateDto(createInstance);
            createRequest.mutate({ body: createDto });
        }
    };

    const updateEntity = () => {
        if (!editInstance || !originalEditInstance) return;

        if (config.dtoConverter) {
            const updateDto = config.dtoConverter.toUpdateDto(
                originalEditInstance,
                editInstance
            );
            //console.log(filteredUpdateDto);
            updateRequest.mutate({
                params: { path: { id: editInstance.id } },
                body: updateDto,
            });
        }
    };

    const deleteEntity = (id: number) => {
        deleteRequest.mutate({ params: { path: { id } } });
    };

    return {
        editContext,
        editInstance,
        setEditInstance: handleSetEditInstance,
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

function diffDtoFields<T extends Record<string, any>>(
    original: Partial<T>,
    updated: Partial<T>
): Partial<T> {
    const result: Partial<T> = {};
    for (const key in updated) {
        if (
            updated.hasOwnProperty(key) &&
            !isEqual(updated[key], original[key])
        ) {
            result[key] = updated[key];
        }
    }
    return result;
}

function cleanDto<T extends Record<string, any>>(dto: T): Partial<T> {
    const result: Partial<T> = {};
    for (const key in dto) {
        if (dto[key] !== undefined) {
            result[key] = dto[key];
        }
    }
    return result;
}
