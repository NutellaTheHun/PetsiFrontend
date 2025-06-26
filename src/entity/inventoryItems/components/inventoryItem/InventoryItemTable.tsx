import { useState } from "react";
import type { components } from "../../../../api-types";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import { InventoryItemRender } from "../../property-render/InventoryItem.render";

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
    //createInventoryItem,
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

    const handleValueChange = (
        key: keyof InventoryItem,
        value: string | number | null
    ) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
    };

    const setState = (
        targetId: number | null,
        rowId: number,
        isEditing: boolean
    ) => {
        if (targetId === rowId) {
            return isEditing ? "edited" : "selected";
        }
        return "normal";
    };

    const context = {
        setItemName: (name: string) => {
            handleValueChange("itemName", name);
        },
        setCategory: (id: number | null) => {
            handleValueChange("category", id);
        },
        setVendor: (id: number | null) => {
            handleValueChange("vendor", id);
        },
        /*setItemSizes: (sizes: InventoryItem["itemSizes"]) => {
            handleValueChange("itemSizes", sizes);
        },*/
    };

    const columns: GenericTableColumn<InventoryItem>[] = [
        {
            key: "itemName",
            label: "Item Name",
            sortable: true,
            render: (item) => (
                <InventoryItemRender
                    entityProp="itemName"
                    instance={item}
                    state={setState(targetId, item.id, isEdit)}
                    context={context}
                />
            ),
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (item) => item.category?.categoryName,
        },
        {
            key: "vendor",
            label: "Vendor",
            sortable: true,
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
            targetId={targetId}
            isEdit={isEdit}
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
