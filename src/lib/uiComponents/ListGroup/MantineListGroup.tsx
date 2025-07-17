import { Button, ScrollArea, Table } from "@mantine/core";
import type { GenericStatefulEntity } from "../../generics/GenericStatefulEntity";
import { MantineNewRowForm } from "../Table/MantineNewRowForm";
import { MantineRowStateSelector } from "../Table/MantineRowStateSelector";

type MantineListGroupProps<T extends { id: number }> = {
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

export function MantineListGroup<T extends { id: number }>({
    items,
    selectedEntityState,
    editingEntityState,
    createEntityState,
    isAddingNewState,
    onCreate,
    onUpdate,
    onDelete,
    renderProperty,
}: MantineListGroupProps<T>) {
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
            <MantineRowStateSelector
                instance={item}
                onSetSelect={setSelectedInstance}
                onSetEdit={setEditInstance}
                onUpdate={onUpdate}
                onDelete={onDelete}
            >
                <Table.Td key={String(item.entity.id)}>
                    {renderProperty(item)}
                </Table.Td>
            </MantineRowStateSelector>
        );
    });

    return (
        <>
            <ScrollArea>
                <Table verticalSpacing="sm">
                    <Table.Thead>Title</Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                    {isCreating && (
                        <MantineNewRowForm
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
                        </MantineNewRowForm>
                    )}
                </Table>
            </ScrollArea>
            <Button onClick={() => setIsCreating(true)}>Create</Button>
        </>
    );
}
