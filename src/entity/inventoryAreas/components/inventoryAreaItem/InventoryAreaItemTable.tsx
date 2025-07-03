import { useState } from "react";
import type { components } from "../../../../api-types";
import { determineState } from "../../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../../lib/generics/propertyRenderers/GenericInput";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import {
    InventoryAreaItemRender,
    type InventoryAreaItemRenderContext,
} from "../../property-render/InventoryAreaItem.render";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];
type UpdateInventoryAreaItemDto =
    components["schemas"]["UpdateInventoryAreaItemDto"];

type Props = {
    inventoryAreaItems: InventoryAreaItem[];
    targetId: number | null;
    setTargetId: (id: number | null) => void;
    sortKey: string;
    sortDirection: string;
    setSortKey: (key: "countDate" | "inventoryArea") => void;
    setSortDirection: (direction: "ASC" | "DESC") => void;
    createInventoryAreaItem: any;
    updateInventoryAreaItem: any;
    deleteInventoryAreaItem: any;
};

export function InventoryAreaItemTable({
    inventoryAreaItems,
    targetId,
    setTargetId,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
    createInventoryAreaItem,
    updateInventoryAreaItem,
    deleteInventoryAreaItem,
}: Props) {
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<InventoryAreaItem | null>(
        null
    );

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setEditingId(null);
            setEditValues(null);
        } else {
            setEditingId(id);
            const rowToEdit = inventoryAreaItems.find((row) => row.id === id);
            if (rowToEdit) {
                setEditValues(rowToEdit);
            }
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setEditingId(null);
        if (editValues) {
            setEditValues(null);
        }
    };

    const handleValueChange = (
        key: keyof UpdateInventoryAreaItemDto,
        value: any
    ) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
    };

    const context: InventoryAreaItemRenderContext = {
        setAmount: (amount) => {
            if (editValues) {
                setEditValues({ ...editValues, amount: amount });
            } else {
                setEditValues({ amount: amount } as InventoryAreaItem);
            }
        },
        setCountedItem: (item) => {
            if (item) {
                if (editValues) {
                    setEditValues({ ...editValues, countedItem: item });
                } else {
                    setEditValues({ countedItem: item } as InventoryAreaItem);
                }
            } /*else {
                setEditValues(null);
            }*/
        },
        setCountedItemSize: (size) => {
            if (size) {
                if (editValues) {
                    setEditValues({ ...editValues, countedItemSize: size });
                } else {
                    setEditValues({
                        countedItemSize: size,
                    } as InventoryAreaItem);
                }
            } /*else {
                setEditValues(null);
            }*/
        },
        inventoryItems: [],
    };

    const columns: GenericTableColumn<InventoryAreaItem>[] = [
        {
            key: "id",
            label: "Id",
            sortable: false,
            render: (row) => (
                /*<GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    readOnly={readonly}
                />*/
                <InventoryAreaItemRender
                    entityProp="id"
                    instance={row}
                    state={determineState(targetId, editingId, row.id)}
                    context={context}
                />
            ),
        },
        {
            key: "countedItem",
            label: "Counted Item",
            sortable: true,
            render: (row, isEditing) => {
                /*<GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    readOnly={readonly}
                />*/

                // if isEditing and rowId === editingI
                // if editValues is null, set editValues to { countedInventoryItemId: row.countedInventoryItemId }
                // if editValues is not null, set editValues to { ...editValues, countedInventoryItemId: row.countedInventoryItemId }
                /*const instance =
                    isEditing && row.id === editingId
                        ? editValues
                            ? {
                                  ...row,
                                  countedInventoryItemId:
                                      editValues.countedInventoryItemId,
                              }
                            : {
                                  ...row,
                              }
                        : row;*/

                const editInstance = editValues ? editValues : row;
                const instance =
                    isEditing && row.id === editingId ? editInstance : row;

                return (
                    <InventoryAreaItemRender
                        entityProp="countedItem"
                        instance={instance}
                        state={determineState(targetId, editingId, row.id)}
                        context={context}
                    />
                );
            },
        },
        {
            key: "amount",
            label: "Amount",
            sortable: true,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.amount}
                    readOnly={readonly}
                    onChange={(e) =>
                        handleValueChange("countedAmount", Number(e))
                    }
                />
            ),
        },
    ];

    const handleHeaderClick = (key: keyof InventoryAreaItem) => {
        // Only allow sorting by valid backend fields
        const validSortKeys: ("countDate" | "inventoryArea")[] = [
            "countDate",
            "inventoryArea",
        ];
        if (!validSortKeys.includes(key as any)) return;

        if (key === sortKey) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortKey(key as "countDate" | "inventoryArea");
            setSortDirection("ASC");
        }
    };

    return (
        <GenericTable<InventoryAreaItem>
            data={inventoryAreaItems}
            columns={columns}
            targetId={targetId}
            editingId={editingId}
            onHeaderClick={handleHeaderClick}
            onSetEdit={setEdit}
            sortBy={sortKey}
            sortDirection={sortDirection as "ASC" | "DESC"}
            onSetSelected={setSelect}
            onDeleteRow={(id) =>
                deleteInventoryAreaItem.mutate({
                    params: { path: { id } },
                })
            }
            onUpdateRow={(id) => {
                if (editValues) {
                    updateInventoryAreaItem.mutate({
                        params: { path: { id } },
                        body: editValues,
                    });
                }
            }}
        />
    );
}
