import { useState } from "react";
import type { components } from "../../../../api-types";
import { GenericInput } from "../../../../lib/generics/propertyRenderers/GenericInput";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";

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
    const [editValues, setEditValues] =
        useState<UpdateInventoryAreaItemDto | null>(null);

    const [isEdit, setIsEdit] = useState(false);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setIsEdit(false);
            setEditValues(null);
        } else {
            setIsEdit(true);
            const rowToEdit = inventoryAreaItems.find((row) => row.id === id);
            if (!rowToEdit) return;
            setEditValues({
                //countedInventoryItemId: rowToEdit.countedItem?.id ?? null,
                //countedAmount: rowToEdit.amount ?? null,
                //countedItemSizeId: rowToEdit.countedItemSize?.id ?? null,
            });
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setIsEdit(false);
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

    const columns: GenericTableColumn<InventoryAreaItem>[] = [
        {
            key: "id",
            label: "Id",
            sortable: false,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    readOnly={readonly}
                />
            ),
        },
        {
            key: "countedItem",
            label: "Counted Item",
            sortable: true,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    readOnly={readonly}
                />
            ),
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
        <GenericTable
            data={inventoryAreaItems}
            columns={columns}
            targetId={targetId}
            isEdit={isEdit}
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
