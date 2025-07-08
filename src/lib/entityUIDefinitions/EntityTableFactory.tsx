import { useState } from "react";
import type { UseEntityFindAllReturn } from "../entityHookTemplates/UseEntityFindAll";
import type {
    BaseCreateContext,
    BaseEditContext,
    BaseEntity,
    UseEntityMutationsReturn,
} from "../entityHookTemplates/UseEntityMutations";
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
    editContext: TEditContext;
    createContext: TCreateContext;
    validSortKeys: TSortKey[];
    columns: GenericTableColumn<T, TEditContext, TCreateContext>[];
}

export function EntityTableFactory<
    T extends { id: number },
    TEditContext extends BaseEditContext,
    TCreateContext extends BaseCreateContext,
    TSortKey extends string
>(contract: EntityTableContext<T, TEditContext, TCreateContext, TSortKey>) {
    return (props: {
        data: T[];
        useEntityMutation: UseEntityMutationsReturn<
            T,
            TEditContext,
            TCreateContext
        >;
        useEntityFindAll: UseEntityFindAllReturn<T, TSortKey>;
        externalSelectedState?: [T | null, (e: T | null) => void];
    }) => {
        const { columns, editContext, createContext, validSortKeys } = contract;

        const [selectedEntity, setSelectedEntity] =
            props.externalSelectedState ?? useState<T | null>(null);

        const statefulData = setStatefulData(
            props.data,
            props.useEntityMutation.editInstance,
            selectedEntity?.id ?? null,
            props.useEntityMutation.editInstance?.id ?? null
        );

        const handleAdd = () => {
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
            <GenericTable<T, TSortKey, TEditContext, TCreateContext>
                data={statefulData}
                columns={columns}
                validSortKeys={validSortKeys}
                selectEntityState={[selectedEntity, setSelectedEntity]}
                editEntityState={[
                    props.useEntityMutation.editInstance,
                    props.useEntityMutation.setEditInstance,
                ]}
                createEntityState={[
                    props.useEntityMutation.createInstance,
                    props.useEntityMutation.setCreateInstance,
                ]}
                sortByState={[
                    props.useEntityFindAll.sortKey,
                    props.useEntityFindAll.setSortKey,
                ]}
                sortDirectionState={[
                    props.useEntityFindAll.sortDirection,
                    props.useEntityFindAll.setSortDirection,
                ]}
                onCreate={handleAdd}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
            />
        );
    };
}
