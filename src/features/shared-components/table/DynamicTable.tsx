import type React from "react";
import { DynamicCell } from "./DynamicCell";
import { DynamicRow } from "./DynamicRow";

export type TableColumn<T> = {
    key: keyof T;
    label: string;
    render: (row: T) => React.ReactNode;
};

type DynamicTableProps<T extends { id: number }> = {
    data: T[];
    columns: TableColumn<T>[];
    selectedId?: number | null;
    onRowClick?: (id: number) => void;
};

export function DynamicTable<T extends { id: number }>({
    data,
    columns,
    selectedId,
    onRowClick,
}: DynamicTableProps<T>) {
    return (
        <table className="table table-success table-striped-columns">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th key={String(col.key)}>{col.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, idx) => (
                    <DynamicRow
                        key={idx}
                        onRowClick={onRowClick}
                        rowId={row.id}
                    >
                        {columns.map((col) => (
                            <DynamicCell key={String(col.key)}>
                                {col.render(row)}
                            </DynamicCell>
                        ))}
                    </DynamicRow>
                ))}
            </tbody>
        </table>
    );
}
