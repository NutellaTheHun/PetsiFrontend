import { useState } from "react";
import type {
    BaseCreateContext,
    BaseEditContext,
    BaseEntity,
    UseEntityMutationsReturn,
} from "../entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../entityHookTemplates/UseGenericEntity";
import { setStatefulData } from "../generics/GenericStatefulEntity";
import {
    GenericTable,
    type GenericTableColumn,
} from "../generics/table/GenericTable";

export interface EntityTableContext<
    T extends BaseEntity,
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext,
    TSortKey extends string
> {
    data: T[];
    useEntityMutation: UseEntityMutationsReturn<
        T,
        TEditContext,
        TCreateContext
    >;
    externalSelectedState?: [T | null, (e: T | null) => void];
    validSortKeys: TSortKey[];
    columns: GenericTableColumn<T, TEditContext, TCreateContext>[];
    sortKeyState: [TSortKey, (sortKey: TSortKey) => void];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    // Add required data from other entities for renderers in extended interfaces
}

export function EntityTableFactory<
    T extends { id: number },
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext,
    TSortKey extends string
>(
    entityContext: EntityTableContext<T, TEditContext, TCreateContext, TSortKey>
) {
    const {
        columns,
        useEntityMutation,
        externalSelectedState,
        validSortKeys,
        data,
        sortKeyState,
        sortDirectionState,
    } = entityContext;

    const [selectedEntity, setSelectedEntity] =
        externalSelectedState ?? useState<T | null>(null);

    const statefulData = setStatefulData(
        data,
        useEntityMutation.editInstance,
        selectedEntity?.id ?? null,
        useEntityMutation.editInstance?.id ?? null
    );

    const handleAdd = () => {
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
        <GenericTable<T, TSortKey, TEditContext, TCreateContext>
            data={statefulData}
            columns={columns}
            validSortKeys={validSortKeys}
            selectEntityState={[selectedEntity, setSelectedEntity]}
            editEntityState={[
                useEntityMutation.editInstance,
                useEntityMutation.setEditInstance,
            ]}
            createEntityState={[
                useEntityMutation.createInstance,
                useEntityMutation.setCreateInstance,
            ]}
            sortByState={sortKeyState}
            sortDirectionState={sortDirectionState}
            onCreate={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );
}
