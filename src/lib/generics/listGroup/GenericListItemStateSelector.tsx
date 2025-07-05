import type { GenericStatefulEntity } from "../GenericStatefulEntity";
import { GenericListItem } from "./GenericListItem";
import { GenericListItemEdited } from "./GenericListItemEdited";
import { GenericListItemSelected } from "./GenericListItemSelected";

type Props<T extends { id: number }> = {
    entityInstance: GenericStatefulEntity<T>;
    onSetSelectEntity: (entity: T) => void;
    onSetEditEntity: (entity: T | null) => void;
    onUpdateInstance: (id: number) => void;
    onDeleteInstance: (id: number) => void;
    children?: React.ReactNode;
};

export function GenericListItemStateSelector<T extends { id: number }>({
    entityInstance,
    onSetSelectEntity,
    onSetEditEntity,
    onUpdateInstance,
    onDeleteInstance,
    children,
}: Props<T>) {
    if (entityInstance.state === "edited") {
        return (
            <GenericListItemEdited
                entityInstance={entityInstance}
                onClickUpdate={onUpdateInstance}
                onToggleEdit={onSetEditEntity}
            >
                {children}
            </GenericListItemEdited>
        );
    }
    if (entityInstance.state === "selected") {
        return (
            <GenericListItemSelected
                entityInstance={entityInstance}
                onClickEdit={() => onSetEditEntity(entityInstance.entity)}
                onClickDelete={onDeleteInstance}
            >
                {children}
            </GenericListItemSelected>
        );
    }
    return (
        <GenericListItem
            entityInstance={entityInstance}
            onItemClick={() => onSetSelectEntity}
        >
            {children}
        </GenericListItem>
    );
}
