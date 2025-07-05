import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { GenericCell } from "./GenericCell";
import { GenericRowStateSelector } from "./GenericRowStateSelector";

export type GenericTableColumn<T> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    render: (row: GenericStatefulEntity<T>) => React.ReactNode;
};

type Props<T extends { id: number }> = {
    data: GenericStatefulEntity<T>[];
    columns: GenericTableColumn<T>[];
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
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
    onSetEdit,
    onSetSelected,
    onHeaderClick,
    onDeleteRow,
    onUpdateRow,
}: Props<T>) {
    return (
        <table className="table table-success">
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
                    return (
                        <GenericRowStateSelector
                            key={idx}
                            instance={row}
                            onSetSelect={onSetSelected}
                            onSetEdit={onSetEdit}
                            onUpdate={onUpdateRow}
                            onDeleteRow={onDeleteRow}
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
