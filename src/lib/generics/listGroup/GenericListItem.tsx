type Props = {
    entityId: number;
    onItemClick: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItem({ entityId, onItemClick, children }: Props) {
    return (
        <li
            onClick={() => onItemClick(entityId)}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
        >
            {children}
        </li>
    );
}
