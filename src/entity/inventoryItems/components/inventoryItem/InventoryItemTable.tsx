import { useState } from "react";
import type { components } from "../../../../api-types";
import { setStatefulData } from "../../../../lib/generics/GenericStatefulEntity";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import { RenderInventoryItemProperty } from "../../property-render/InventoryItem.render";

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
    const [editingId, setEditingId] = useState<number | null>(null);

    const statefulInventoryItems = setStatefulData(
        inventoryItems,
        targetId,
        editingId
    );

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setEditingId(null);
            setEditValues(null);
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
        key: keyof InventoryItem,
        value: string | number | null
    ) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
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
                <RenderInventoryItemProperty
                    entityProp="itemName"
                    statefulInstance={item}
                    context={context}
                />
            ),
        },
        {
            key: "category",
            label: "Category",
            sortable: true,
            render: (item) => (
                <RenderInventoryItemProperty
                    entityProp="category"
                    statefulInstance={item}
                    context={context}
                />
            ),
        },
        {
            key: "vendor",
            label: "Vendor",
            sortable: true,
            render: (item) => (
                <RenderInventoryItemProperty
                    entityProp="vendor"
                    statefulInstance={item}
                    context={context}
                />
            ),
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
        <GenericTable<InventoryItem>
            data={statefulInventoryItems}
            columns={columns}
            sortBy={sortKey}
            sortDirection={sortDirection}
            onHeaderClick={handleHeaderClick}
            onSetEdit={setEdit}
            onSetSelected={setSelect}
            onUpdate={(id) => {
                if (editValues) {
                    updateInventoryItem.mutate({
                        params: { path: { id } },
                        body: editValues,
                    });
                }
            }}
            onDelete={(id) => {
                deleteInventoryItem.mutate({
                    params: { path: { id } },
                });
            }}
        />
    );
}
