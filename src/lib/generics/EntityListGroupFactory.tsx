import React, { useState } from "react";
import {
    setStatefulData,
    type GenericStatefulEntity,
} from "./GenericStatefulEntity";
import type {
    BaseCreateContext,
    BaseEditContext,
    BaseEntity,
    UseEntityMutationsReturn,
} from "./UseEntityMutations";
import { GenericListGroup } from "./listGroup/GenericListGroup";

export interface IEntityListGroup<
    T extends BaseEntity,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    useEntityMutator: UseEntityMutationsReturn<T, TEditContext, TCreateContext>;
    statefulEntityData: GenericStatefulEntity<T>[];
    handleAddEntity: () => void;
    handleUpdateEntity: () => void;
    handleDeleteEntity: (id: number) => void;
    renderItem: (
        item: GenericStatefulEntity<T>,
        context: { editContext: TEditContext; createContext: TCreateContext }
    ) => React.ReactNode;
}

export interface EntityContext<
    T extends BaseEntity,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    useEntityMutation: UseEntityMutationsReturn<
        T,
        TEditContext,
        TCreateContext
    >;
    renderItem: (
        item: GenericStatefulEntity<T>,
        context: { editContext: TEditContext; createContext: TCreateContext }
    ) => React.ReactNode;
}

export function EntityListGroupFactory<
    T extends { id: number },
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
>(contract: EntityContext<T, TEditContext, TCreateContext>) {
    return (props: {
        data: T[];
        externalSelectedState?: [T | null, (e: T | null) => void];
    }) => {
        const { useEntityMutation, renderItem } = contract;

        const {
            editContext,
            editInstance,
            setEditInstance,
            createContext,
            createInstance,
            setCreateInstance,
            resetEditValues,
            resetCreateValues,
            createEntity,
            updateEntity,
            deleteEntity,
        } = useEntityMutation;

        const [selected, setSelected] =
            props.externalSelectedState ?? useState<T | null>(null);

        const statefulData = setStatefulData(
            props.data,
            editInstance,
            selected?.id ?? null,
            editInstance?.id ?? null
        );

        const handleCreate = () => {
            if (createInstance) {
                createEntity();
                resetCreateValues();
            }
        };

        const handleUpdate = () => {
            updateEntity();
            resetEditValues();
        };

        const handleDelete = (id: number) => {
            deleteEntity(id);
        };

        return (
            <GenericListGroup<T>
                items={statefulData}
                selectedEntityState={[selected, setSelected]}
                editingEntityState={[editInstance, setEditInstance]}
                createEntityState={[createInstance, setCreateInstance]}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                renderItem={(item) =>
                    renderItem(item, {
                        editContext,
                        createContext,
                    })
                }
            />
        );
    };
}
