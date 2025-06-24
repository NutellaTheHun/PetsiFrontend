type Props = {
    children: React.ReactNode[];
    onSetSelect?: (id: number) => void;
    rowId: number;
};
export function GenericRow({ children, onSetSelect, rowId }: Props) {
    return (
        <tr
            className="table-light"
            onClick={() => onSetSelect?.(rowId)}
            style={{
                cursor: "pointer",
            }}
        >
            {children}
        </tr>
    );
}
