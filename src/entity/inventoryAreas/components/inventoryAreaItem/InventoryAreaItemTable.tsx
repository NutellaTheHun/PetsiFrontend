import { useState } from "react";
import type { components } from "../../../../api-types";
import { setStatefulData } from "../../../../lib/generics/GenericStatefulEntity";
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

    const statefulInventoryAreaItems = setStatefulData(
        inventoryAreaItems,
        targetId,
        editingId
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
                <InventoryAreaItemRender
                    entityProp="id"
                    statefulInstance={row}
                    context={context}
                />
            ),
        },
        {
            key: "countedItem",
            label: "Counted Item",
            sortable: true,
            render: (row) => {
                return (
                    <InventoryAreaItemRender
                        entityProp="countedItem"
                        statefulInstance={row}
                        context={context}
                    />
                );
            },
        },
        {
            key: "amount",
            label: "Amount",
            sortable: true,
            render: (row) => (
                <GenericInput
                    key={String(row.entity.id)}
                    type="number"
                    value={row.entity.amount}
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
            data={statefulInventoryAreaItems}
            columns={columns}
            onHeaderClick={handleHeaderClick}
            onSetEdit={setEdit}
            sortBy={sortKey}
            sortDirection={sortDirection as "ASC" | "DESC"}
            onSetSelected={setSelect}
            onDelete={(id) =>
                deleteInventoryAreaItem.mutate({
                    params: { path: { id } },
                })
            }
            onUpdate={(id) => {
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
