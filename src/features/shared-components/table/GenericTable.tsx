import { GenericCell } from "./GenericCell";
import { GenericRowStateSelector } from "./GenericRowStateSelector";

export type GenericTableColumn<T> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    editable: boolean;
    render: (
        row: T,
        isEditing: boolean,
        targetId: number | null
    ) => React.ReactNode;
};

type Props<T extends { id: number }> = {
    data: T[];
    columns: GenericTableColumn<T>[];
    sortBy?: string;
    sortDirection?: "ASC" | "DESC";
    targetId: number | null;
    isEdit: boolean;
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
                            rowId={row.id}
                            targetId={targetId}
                            isEdit={isEdit}
                            onSetSelect={onSetSelected}
                            onSetEdit={onSetEdit}
                            onUpdate={onUpdateRow}
                            onDeleteRow={onDeleteRow}
                        >
                            {columns.map((col) => (
                                <GenericCell key={String(col.key)}>
                                    {col.render(row, isEdit, targetId)}
                                </GenericCell>
                            ))}
                        </GenericRowStateSelector>
                    );
                })}
            </tbody>
        </table>
    );
}
