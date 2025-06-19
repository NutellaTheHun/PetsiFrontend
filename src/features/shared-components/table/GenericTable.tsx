import type React from "react";
import { GenericCell } from "./GenericCell";
import { GenericRow } from "./GenericRow";
import { GenericRowEdited } from "./GenericRowEdited";
import { GenericRowSelected } from "./GenericRowSelected";

export type GenericTableColumn<T> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    editable: boolean;
    render: (row: T, readonly: boolean) => React.ReactNode;
};

type Props<T extends { id: number }> = {
    data: T[];
    columns: GenericTableColumn<T>[];

    sortBy?: string;
    sortDirection?: "ASC" | "DESC";

    selectedId?: number | null;
    onSetSelected?: (id: number | null) => void;

    editedId?: number | null;
    onSetEdit?: (id: number | null) => void;

    onRowClick?: (id: number) => void;
    onHeaderClick?: (key: keyof T) => void;

    onDeleteRow?: (id: number) => void;
    onUpdateRow?: (id: number) => void;
};

export function GenericTable<T extends { id: number }>({
    data,
    columns,
    selectedId,
    editedId,
    onRowClick,
    onHeaderClick,
    sortBy,
    sortDirection,
    onDeleteRow,
    onUpdateRow,
    onSetEdit,
    onSetSelected,
}: Props<T>) {
    return (
        <table className="table table-success table-striped-columns">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={String(col.key)}
                            onClick={
                                col.sortable && onHeaderClick
                                    ? () => onHeaderClick(col.key)
                                    : undefined
                            }
                            style={{
                                cursor: col.sortable ? "pointer" : "default",
                            }}
                        >
                            {col.label}
                            {col.sortable && sortBy === col.key && (
                                <span>
                                    {sortDirection === "ASC" ? "▲" : "▼"}
                                </span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => {
                    if (editedId === row.id) {
                        return (
                            <GenericRowEdited
                                key={idx}
                                onRowClick={onRowClick}
                                rowId={row.id}
                                setEdit={onSetEdit}
                                onUpdate={onUpdateRow}
                            >
                                {columns.map((col) => (
                                    <GenericCell key={String(col.key)}>
                                        {col.render(row, false)}
                                    </GenericCell>
                                ))}
                            </GenericRowEdited>
                        );
                    }
                    if (selectedId === row.id) {
                        return (
                            <GenericRowSelected
                                key={idx}
                                onRowClick={onRowClick}
                                rowId={row.id}
                                onDeleteRow={onDeleteRow}
                                setEdit={onSetEdit}
                            >
                                {columns.map((col) => (
                                    <GenericCell key={String(col.key)}>
                                        {col.render(row, true)}
                                    </GenericCell>
                                ))}
                            </GenericRowSelected>
                        );
                    } else {
                        return (
                            <GenericRow
                                key={idx}
                                rowId={row.id}
                                onSetSelect={onRowClick}
                            >
                                {columns.map((col) => (
                                    <GenericCell key={String(col.key)}>
                                        {col.render(row, true)}
                                    </GenericCell>
                                ))}
                            </GenericRow>
                        );
                    }
                })}
            </tbody>
        </table>
    );
}
