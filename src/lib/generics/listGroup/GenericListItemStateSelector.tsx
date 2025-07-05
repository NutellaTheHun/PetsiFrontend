import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { GenericListItem } from "./GenericListItem";
import { GenericListItemEdited } from "./GenericListItemEdited";
import { GenericListItemSelected } from "./GenericListItemSelected";

type Props<T extends { id: number }> = {
    entityInstance: GenericStatefulEntity<T>;
    onSetSelectId: (id: number) => void;
    onSetEditId: (id: number | null) => void;
    onUpdateInstance: (id: number) => void;
    onDeleteInstance: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemStateSelector<T extends { id: number }>({
    entityInstance,
    onSetSelectId,
    onSetEditId,
    onUpdateInstance,
    onDeleteInstance,
    children,
}: Props<T>) {
    if (entityInstance.state === "edited") {
        return (
            <GenericListItemEdited
                entityInstance={entityInstance}
                onClickUpdate={() => onUpdateInstance}
                onClickCancel={() => onSetEditId}
            >
                {children}
            </GenericListItemEdited>
        );
    }
    if (entityInstance.state === "selected") {
        return (
            <GenericListItemSelected
                entityInstance={entityInstance}
                onClickEdit={() => onSetEditId}
                onClickDelete={() => onDeleteInstance}
            >
                {children}
            </GenericListItemSelected>
        );
    }
    return (
        <GenericListItem
            entityInstance={entityInstance}
            onItemClick={() => onSetSelectId}
        >
            {children}
        </GenericListItem>
    );
}
