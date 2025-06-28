import { GenericListItem } from "./GenericListItem";
import { GenericListItemEdited } from "./GenericListItemEdited";
import { GenericListItemSelected } from "./GenericListItemSelected";

type Props = {
    targetId: number | null;
    itemId: number;
    editingId: number | null;
    editContext?: any;
    onSetSelect: (id: number) => void;
    onSetEditingId: (id: number | null) => void;
    onUpdate: (id: number) => void;
    onDelete: (id: number) => void;
    onInputValueChange?: (value: string) => void;
    children?: React.ReactNode;
};

export function GenericListItemStateSelector({
    targetId,
    itemId,
    editingId,
    editContext,
    onSetSelect,
    onSetEditingId,
    onUpdate,
    onDelete,
    onInputValueChange,
    children,
}: Props) {
    if (targetId === itemId && editingId === itemId) {
        return (
            <GenericListItemEdited
                entityId={itemId}
                onInputValueChange={
                    onInputValueChange || editContext?.setAreaName
                }
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
