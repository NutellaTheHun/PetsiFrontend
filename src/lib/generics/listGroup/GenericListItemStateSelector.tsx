import { GenericListItem } from "./GenericListItem";
import { GenericListItemEdited } from "./GenericListItemEdited";
import { GenericListItemSelected } from "./GenericListItemSelected";

type Props = {
    targetId: number | null;
    itemId: number;
    editingId: number | null;
    onSetSelect: (id: number) => void;
    onSetEditingId: (id: number | null) => void;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemStateSelector({
    targetId,
    itemId,
    editingId,
    onSetSelect,
    onSetEditingId,
    onUpdate,
    onDelete,
    children,
}: Props) {
    if (targetId === itemId && editingId === itemId) {
        return (
            <GenericListItemEdited
                entityId={itemId}
                onClickUpdate={onUpdate}
                onClickCancel={onSetEditingId}
            >
                {children}
            </GenericListItemEdited>
        );
    }
    if (targetId === itemId) {
        return (
            <GenericListItemSelected
                entityId={itemId}
                onClickEdit={onSetEditingId}
                onClickDelete={onDelete}
            >
                {children}
            </GenericListItemSelected>
        );
    }
    return (
        <GenericListItem entityId={itemId} onItemClick={onSetSelect}>
            {children}
        </GenericListItem>
    );
}
