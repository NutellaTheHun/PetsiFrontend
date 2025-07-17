import React, { useState } from "react";
import type {
    BaseCreateContext,
    BaseEditContext,
    BaseEntity,
    UseEntityMutationsReturn,
} from "../entityHookTemplates/UseEntityMutations";
import {
    setStatefulData,
    type GenericStatefulEntity,
} from "../GenericStatefulEntity";
import { GenericListGroup } from "../uiComponents/ListGroup/GenericListGroup";

export interface EntityListGroupContext<
    T extends BaseEntity,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
> {
    data: T[];
    externalSelectedState?: [T | null, (e: T | null) => void];
    useEntityMutation: UseEntityMutationsReturn<
        T,
        TEditContext,
        TCreateContext
    >;
    renderProperty: (item: GenericStatefulEntity<T>) => React.ReactNode;
}

export function EntityListGroupFactory<
    T extends { id: number },
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext
>(entityContext: EntityListGroupContext<T, TEditContext, TCreateContext>) {
    const { renderProperty, data, externalSelectedState, useEntityMutation } =
        entityContext;

    const [selected, setSelected] =
        externalSelectedState ?? useState<T | null>(null);

    const [isAddingNew, setIsAddingNew] = useState(false);

    const statefulData = setStatefulData(
        data,
        useEntityMutation.editInstance,
        selected?.id ?? null,
        useEntityMutation.editInstance?.id ?? null
    );

    const handleCreate = () => {
        if (useEntityMutation.createInstance) {
            useEntityMutation.createEntity();
            useEntityMutation.resetCreateValues();
        }
    };

    const handleUpdate = () => {
        useEntityMutation.updateEntity();
        useEntityMutation.resetEditValues();
    };

    const handleDelete = (id: number) => {
        useEntityMutation.deleteEntity(id);
    };

    return (
        <GenericListGroup<T>
            items={statefulData}
            selectedEntityState={[selected, setSelected]}
            editingEntityState={[
                useEntityMutation.editInstance,
                useEntityMutation.setEditInstance,
            ]}
            createEntityState={[
                useEntityMutation.createInstance,
                useEntityMutation.setCreateInstance,
            ]}
            isAddingNewState={[isAddingNew, setIsAddingNew]}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            renderProperty={(item) => renderProperty(item)}
        />
    );
}
