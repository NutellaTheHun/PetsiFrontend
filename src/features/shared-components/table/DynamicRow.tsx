type Props = {
    children: React.ReactNode[];
    onRowClick?: (id: number) => void;
    rowId: number;
};
export function DynamicRow({ children, onRowClick, rowId }: Props) {
    return <tr onClick={() => onRowClick?.(rowId)}>{children}</tr>;
}
