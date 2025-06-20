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
    targetId?: number | null;
    isEdit?: boolean;
    onSetSelected?: (id: number | null) => void;
    onSetEdit?: (id: number | null) => void;
    onHeaderClick?: (key: keyof T) => void;
    onDeleteRow?: (id: number) => void;
    onUpdateRow?: (id: number) => void;
};

export function GenericTable<T extends { id: number }>({
    data,
    columns,
    sortBy,
    sortDirection,
    targetId,
    isEdit,
    onSetEdit,
    onSetSelected,
    onHeaderClick,
    onDeleteRow,
    onUpdateRow,
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
                    if (targetId === row.id && isEdit) {
                        return (
                            <GenericRowEdited
                                key={idx}
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
                    if (targetId === row.id && !isEdit) {
                        return (
                            <GenericRowSelected
                                key={idx}
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
                                onSetSelect={onSetSelected}
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
