import { Button, ScrollArea, Table } from "@mantine/core";
import { useState } from "react";
import { SORT_DIRECTION } from "../../entityHookTemplates/UseEntityFindAll";
import type { SortDirection } from "../../entityHookTemplates/UseGenericEntity";
import { type GenericStatefulEntity } from "../../generics/GenericStatefulEntity";
import { MantineNewRowForm } from "./MantineNewRowForm";
import { MantineRowStateSelector } from "./MantineRowStateSelector";

/*
head – an array of React nodes (React.ReactNode[]) to render Table.Th in Table.Thead
foot – an array of React nodes (React.ReactNode[]) to render Table.Th in Table.Tfoot
body - an array of arrays of React nodes (React.ReactNode[][]) to render Table.Td in Table.Tbody
caption – a React node to render Table.Caption
 */
export type MantineTableColumn<T, TEditContext, TCreateContext> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    renderProperty: (entity: GenericStatefulEntity<T>) => React.ReactNode;
};

interface MantineTableWithSelectionProps<
    T extends { id: number },
    TSortKey extends string,
    TEditContext,
    TCreateContext
> {
    data: GenericStatefulEntity<T>[];
    columns: MantineTableColumn<T, TEditContext, TCreateContext>[];
    validSortKeys: TSortKey[];
    selectEntityState: [T | null, (entity: T | null) => void];
    editEntityState: [Partial<T> | null, (entity: Partial<T> | null) => void];
    createEntityState: [Partial<T>, (entity: Partial<T>) => void];
    sortByState: [TSortKey, (key: TSortKey) => void];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    onCreate: () => void;
    onDelete: (id: number) => void;
    onUpdate: () => void;
}

export function MantineTableWithSelection<
    T extends { id: number },
    TSortKey extends string,
    TEditContext,
    TCreateContext
>({
    data,
    columns,
    validSortKeys,
    selectEntityState,
    editEntityState,
    createEntityState,
    sortByState,
    sortDirectionState,
    onCreate,
    onDelete,
    onUpdate,
}: MantineTableWithSelectionProps<T, TSortKey, TEditContext, TCreateContext>) {
    const [selectedInstance, setSelectedInstance] = selectEntityState;
    const [editInstance, setEditInstance] = editEntityState;
    const [createInstance, setCreateInstance] = createEntityState;
    const [sortBy, setSortKey] = sortByState;
    const [sortDirection, setSortDirection] = sortDirectionState;

    const [isCreating, setIsCreating] = useState(false);

    const handleCreateEntity = () => {
        onCreate();
        setIsCreating(false);
    };

    const handleHeaderClick = (key: keyof T) => {
        if (!validSortKeys.includes(key as any)) return;

        if (key === sortBy) {
            setSortDirection(
                sortDirection === SORT_DIRECTION.ASC
                    ? SORT_DIRECTION.DESC
                    : SORT_DIRECTION.ASC
            );
        } else {
            setSortKey(key as TSortKey);
            setSortDirection(SORT_DIRECTION.ASC);
        }
    };

    const rows = data.map((item) => {
        return (
            <MantineRowStateSelector
                instance={item}
                onSetSelect={setSelectedInstance}
                onSetEdit={setEditInstance}
                onUpdate={onUpdate}
                onDelete={onDelete}
            >
                {columns.map((col) => (
                    <Table.Td key={String(col.key)}>
                        {col.renderProperty(item)}
                    </Table.Td>
                ))}
            </MantineRowStateSelector>
        );
    });

    return (
        <>
            <ScrollArea>
                <Table miw={800} verticalSpacing="sm">
                    <Table.Thead>
                        <Table.Tr>
                            {columns.map((col) => (
                                <Table.Th
                                    key={String(col.key)}
                                    onClick={() => handleHeaderClick(col.key)}
                                >
                                    {col.label}
                                    {col.sortable && sortBy === col.key && (
                                        <span>
                                            {sortDirection ===
                                            SORT_DIRECTION.ASC
                                                ? "▲"
                                                : "▼"}
                                        </span>
                                    )}
                                </Table.Th>
                            ))}
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                    {isCreating && (
                        <MantineNewRowForm
                            onSubmit={handleCreateEntity}
                            onCancel={() => setIsCreating(false)}
                        >
                            {columns.map((col) => (
                                <Table.Td key={String(col.key)}>
                                    {col.renderProperty({
                                        entity: createInstance,
                                        state: "create",
                                    } as GenericStatefulEntity<T>)}
                                </Table.Td>
                            ))}
                        </MantineNewRowForm>
                    )}
                </Table>
            </ScrollArea>
            <Button onClick={() => setIsCreating(true)}>Create</Button>
        </>
    );
}
