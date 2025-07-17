import { Button, Group, Table } from "@mantine/core";
import {
    isEditState,
    isSelectedState,
    type GenericStatefulEntity,
} from "../../generics/GenericStatefulEntity";
import classes from "./MantineTableWithSelection.module.css";

type Props<T extends { id: number }> = {
    instance: GenericStatefulEntity<T>;
    children: React.ReactNode[] | React.ReactNode;
    onSetSelect: (entity: T) => void;
    onSetEdit: (entity: T | null) => void;
    onUpdate: () => void;
    onDelete: (id: number) => void;
};

export function MantineRowStateSelector<T extends { id: number }>({
    instance,
    children,
    onSetSelect,
    onSetEdit,
    onUpdate,
    onDelete,
}: Props<T>) {
    if (isEditState(instance)) {
        return (
            <Table.Tr key={instance.entity.id} className={classes.rowSelected}>
                {children}
                <Table.Td colSpan={2}>
                    <Group justify="end" gap="xs">
                        <Button onClick={onUpdate}>Save</Button>
                        <Button onClick={() => onSetEdit(null)}>Cancel</Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    }
    if (isSelectedState(instance)) {
        return (
            <Table.Tr key={instance.entity.id} className={classes.rowSelected}>
                {children}
                <Table.Td colSpan={2}>
                    <Group justify="end" gap="xs">
                        <Button onClick={() => onSetEdit(instance.entity)}>
                            Edit
                        </Button>
                        <Button onClick={() => onDelete(instance.entity.id)}>
                            Delete
                        </Button>
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    }
    return (
        <Table.Tr
            key={instance.entity.id}
            onClick={() => onSetSelect(instance.entity)}
        >
            {children}
        </Table.Tr>
    );
}
