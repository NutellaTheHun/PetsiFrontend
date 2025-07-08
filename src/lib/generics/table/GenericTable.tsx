import { useState } from "react";
import {
    SORT_DIRECTION,
    type SortDirection,
} from "../../entityHookTemplates/UseGenericEntity";
import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { GenericCell } from "./GenericCell";
import { GenericNewRowForm } from "./GenericNewRowForm";
import { GenericRowStateSelector } from "./GenericRowStateSelector";

export type GenericTableColumn<T, TEditContext, TCreateContext> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    renderProperty: (
        entity: GenericStatefulEntity<T>,
        context: { editContext: TEditContext; createContext: TCreateContext }
    ) => React.ReactNode;
};

type Props<
    T extends { id: number },
    TSortKey extends string,
    TEditContext,
    TCreateContext
> = {
    data: GenericStatefulEntity<T>[];
    columns: GenericTableColumn<T, TEditContext, TCreateContext>[];
    validSortKeys: TSortKey[];
    selectEntityState: [T | null, (entity: T | null) => void];
    editEntityState: [Partial<T> | null, (entity: Partial<T> | null) => void];
    createEntityState: [Partial<T>, (entity: Partial<T>) => void];
    sortByState: [TSortKey, (key: TSortKey) => void];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    onCreate: () => void;
    onDelete: (id: number) => void;
    onUpdate: () => void;
};

export function GenericTable<
    T extends { id: number },
    TSortKey extends string,
    TEditContext,
    TCreateContext
>({
    data,
    columns,
    validSortKeys,
    selectEntityState,
    editEntityState,
    createEntityState,
    sortByState,
    sortDirectionState,
    onCreate,
    onDelete,
    onUpdate,
}: Props<T, TSortKey, TEditContext, TCreateContext>) {
    const [selectedInstance, setSelectedInstance] = selectEntityState;
    const [editInstance, setEditInstance] = editEntityState;
    const [createInstance, setCreateInstance] = createEntityState;
    const [sortBy, setSortKey] = sortByState;
    const [sortDirection, setSortDirection] = sortDirectionState;

    const [isCreating, setIsCreating] = useState(false);

    const handleCreateEntity = () => {
        onCreate();
        setIsCreating(false);
    };

    const handleHeaderClick = (key: keyof T) => {
        if (!validSortKeys.includes(key as any)) return;

        if (key === sortBy) {
            setSortDirection(
                sortDirection === SORT_DIRECTION.ASC
                    ? SORT_DIRECTION.DESC
                    : SORT_DIRECTION.ASC
            );
        } else {
            setSortKey(key as TSortKey);
            setSortDirection(SORT_DIRECTION.ASC);
        }
    };

    return (
        <div className="d-flex align-items-start">
            <table className="table table-success flex-grow-1">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={String(col.key)}
                                onClick={
                                    col.sortable
                                        ? () => handleHeaderClick(col.key)
                                        : undefined
                                }
                                style={{
                                    cursor: col.sortable
                                        ? "pointer"
                                        : "default",
                                }}
                            >
                                {col.label}
                                {col.sortable && sortBy === col.key && (
                                    <span>
                                        {sortDirection === SORT_DIRECTION.ASC
                                            ? "▲"
                                            : "▼"}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, idx) => {
                        return (
                            <GenericRowStateSelector
                                key={idx}
                                instance={row}
                                onSetSelect={setSelectedInstance}
                                onSetEdit={setEditInstance}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                            >
                                {columns.map((col) => (
                                    <GenericCell key={String(col.key)}>
                                        {col.renderProperty(row, {
                                            editContext: editInstance,
                                            createContext: createInstance,
                                        })}
                                    </GenericCell>
                                ))}
                            </GenericRowStateSelector>
                        );
                    })}
                    {isCreating && (
                        <GenericNewRowForm
                            onSubmit={handleCreateEntity}
                            onCancel={() => setIsCreating(false)}
                        >
                            {columns.map((col) => (
                                <GenericCell key={String(col.key)}>
                                    {col.renderProperty({
                                        entity: createInstance,
                                        state: "create",
                                    } as unknown as GenericStatefulEntity<T>)}
                                </GenericCell>
                            ))}
                        </GenericNewRowForm>
                    )}
                </tbody>
            </table>
            <div className="ms-3 d-flex flex-column">
                <button
                    className="btn btn-primary"
                    onClick={() => setIsCreating(true)}
                >
                    Create
                </button>
            </div>
        </div>
    );
}
