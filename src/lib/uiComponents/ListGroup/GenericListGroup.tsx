import { Button, ScrollArea, Table } from "@mantine/core";
import type { GenericStatefulEntity } from "../../GenericStatefulEntity";
import { GenericRowStateSelector } from "../Table/GenericRowStateSelector";
import { NewRowForm } from "../Table/NewRowForm";

type GenericListGroupProps<T extends { id: number }> = {
    items: GenericStatefulEntity<T>[];
    selectedEntityState: [T | null, (entity: T | null) => void];
    editingEntityState: [
        Partial<T> | null,
        (entity: Partial<T> | null) => void
    ];
    createEntityState: [Partial<T>, (entity: Partial<T>) => void];
    isAddingNewState: [boolean, (isAddingNew: boolean) => void];
    onCreate: () => void;
    onDelete: (id: number) => void;
    onUpdate: () => void;
    renderProperty: (item: GenericStatefulEntity<T>) => React.ReactNode;
};

// Based on MantineTableWithSelection
export function GenericListGroup<T extends { id: number }>({
    items,
    selectedEntityState,
    editingEntityState,
    createEntityState,
    isAddingNewState,
    onCreate,
    onUpdate,
    onDelete,
    renderProperty,
}: GenericListGroupProps<T>) {
    const [selectedInstance, setSelectedInstance] = selectedEntityState;
    const [editInstance, setEditInstance] = editingEntityState;
    const [createInstance, setCreateInstance] = createEntityState;

    const [isCreating, setIsCreating] = isAddingNewState;

    const handleCreateEntity = () => {
        onCreate();
        setIsCreating(false);
    };

    const rows = items.map((item) => {
        return (
            <GenericRowStateSelector
                instance={item}
                onSetSelect={setSelectedInstance}
                onSetEdit={setEditInstance}
                onUpdate={onUpdate}
                onDelete={onDelete}
            >
                <Table.Td key={String(item.entity.id)}>
                    {renderProperty(item)}
                </Table.Td>
            </GenericRowStateSelector>
        );
    });

    return (
        <>
            <ScrollArea>
                <Table verticalSpacing="sm">
                    <Table.Tbody>{rows}</Table.Tbody>
                    {isCreating && (
                        <NewRowForm
                            onSubmit={handleCreateEntity}
                            onCancel={() => setIsCreating(false)}
                        >
                            {
                                <Table.Td key={String("create-instance-row")}>
                                    {renderProperty({
                                        entity: createInstance,
                                        state: "create",
                                    } as GenericStatefulEntity<T>)}
                                </Table.Td>
                            }
                        </NewRowForm>
                    )}
                </Table>
            </ScrollArea>
            <Button onClick={() => setIsCreating(true)}>Create</Button>
        </>
    );
}
