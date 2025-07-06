import { useState } from "react";
import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { SORT_DIRECTION, type SortDirection } from "../UseGenericEntity";
import { GenericCell } from "./GenericCell";
import { GenericRowStateSelector } from "./GenericRowStateSelector";

export type GenericTableColumn<T> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    render: (row: GenericStatefulEntity<T>) => React.ReactNode;
};

type Props<T extends { id: number }, TSortKey extends string> = {
    data: GenericStatefulEntity<T>[];
    columns: GenericTableColumn<T>[];
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
    TSortKey extends string
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
}: Props<T, TSortKey>) {
    const [selectedEntity, setSelectedEntity] = selectEntityState;
    const [editEntity, setEditEntity] = editEntityState;
    const [createEntity, setCreateEntity] = createEntityState;
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
        <table className="table table-success">
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
                                cursor: col.sortable ? "pointer" : "default",
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
                            onSetSelect={setSelectedEntity}
                            onSetEdit={setEditEntity}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        >
                            {columns.map((col) => (
                                <GenericCell key={String(col.key)}>
                                    {col.render(row)}
                                </GenericCell>
                            ))}
                        </GenericRowStateSelector>
                    );
                })}
            </tbody>
        </table>
    );
}
