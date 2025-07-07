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
        useEntityMutation: UseEntityMutationsReturn<
            T,
            TEditContext,
            TCreateContext
        >;
        externalSelectedState?: [T | null, (e: T | null) => void];
    }) => {
        const { renderItem } = contract;

        const [selected, setSelected] =
            props.externalSelectedState ?? useState<T | null>(null);

        const statefulData = setStatefulData(
            props.data,
            props.useEntityMutation.editInstance,
            selected?.id ?? null,
            props.useEntityMutation.editInstance?.id ?? null
        );

        const handleCreate = () => {
            if (props.useEntityMutation.createInstance) {
                props.useEntityMutation.createEntity();
                props.useEntityMutation.resetCreateValues();
            }
        };

        const handleUpdate = () => {
            props.useEntityMutation.updateEntity();
            props.useEntityMutation.resetEditValues();
        };

        const handleDelete = (id: number) => {
            props.useEntityMutation.deleteEntity(id);
        };

        return (
            <GenericListGroup<T>
                items={statefulData}
                selectedEntityState={[selected, setSelected]}
                editingEntityState={[
                    props.useEntityMutation.editInstance,
                    props.useEntityMutation.setEditInstance,
                ]}
                createEntityState={[
                    props.useEntityMutation.createInstance,
                    props.useEntityMutation.setCreateInstance,
                ]}
                onCreate={handleCreate}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                renderItem={(item) =>
                    renderItem(item, {
                        editContext: props.useEntityMutation.editContext,
                        createContext: props.useEntityMutation.createContext,
                    })
                }
            />
        );
    };
}
