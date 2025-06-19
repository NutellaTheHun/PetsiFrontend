type Props = {
    children: React.ReactNode[];
    onSetSelect?: (id: number) => void;
    rowId: number;
};
export function GenericRow({ children, onSetSelect, rowId }: Props) {
    return <tr onClick={() => onSetSelect?.(rowId)}>{children}</tr>;
}
