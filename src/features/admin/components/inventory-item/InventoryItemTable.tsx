import { useState } from "react";
import type { components } from "../../../../api-types";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";
import { GenericInput } from "../../../shared-components/table/render-cell-content/GenericInput";

type InventoryItem = components["schemas"]["InventoryItem"];

type Props = {
    inventoryItems: InventoryItem[];
    sortKey: string;
    sortDirection: "ASC" | "DESC";
    setSortKey: (key: string) => void;
    setSortDirection: (direction: "ASC" | "DESC") => void;
    targetId: number | null;
    setTargetId: (id: number | null) => void;
    createInventoryItem: any;
    updateInventoryItem: any;
    deleteInventoryItem: any;
};

export function InventoryItemTable({
    inventoryItems,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
    targetId,
    setTargetId,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
}: Props) {
    const [editValues, setEditValues] = useState<InventoryItem | null>(null);
    const [isEdit, setIsEdit] = useState(false);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setIsEdit(false);
            setEditValues(null);
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setIsEdit(false);
        if (editValues) {
            setEditValues(null);
        }
    };

    const handleValueChange = (key: keyof InventoryItem, value: string) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
    };

    const columns: GenericTableColumn<InventoryItem>[] = [
        {
            key: "itemName",
            label: "Item Name",
            sortable: true,
            editable: true,
            render: (item) => (
                <GenericInput value={item.itemName} onChange={(e) => {}} />
            ),
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            editable: true,
            render: (item) => item.category?.categoryName,
        },
        {
            key: "vendor",
            label: "Vendor",
            sortable: true,
            editable: true,
            render: (item) => item.vendor?.vendorName,
        },
    ];

    const handleHeaderClick = (key: keyof InventoryItem) => {
        if (key === sortKey) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortKey(key);
            setSortDirection("ASC");
        }
    };

    return (
        <GenericTable
            data={inventoryItems}
            columns={columns}
            sortBy={sortKey}
            sortDirection={sortDirection}
            onHeaderClick={handleHeaderClick}
            onSetEdit={setEdit}
            onSetSelected={setSelect}
            onUpdateRow={(id) => {
                if (editValues) {
                    updateInventoryItem.mutate({
                        params: { path: { id } },
                        body: editValues,
                    });
                }
            }}
            onDeleteRow={(id) => {
                deleteInventoryItem.mutate({
                    params: { path: { id } },
                });
            }}
        />
    );
}
