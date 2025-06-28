import { useState } from "react";
import type { components } from "../../../../api-types";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";
import { InventoryItemRender } from "../../property-render/InventoryItem.render";

type InventoryItem = components["schemas"]["InventoryItem"];

type Props = {
    inventoryItems: InventoryItem[];
    targetId: number | null;
    setTargetId: (id: number | null) => void;
    createInventoryItem: any;
    updateInventoryItem: any;
    deleteInventoryItem: any;
};

export function InventoryItemListGroup({
    inventoryItems,
    targetId,
    setTargetId,
    updateInventoryItem,
    deleteInventoryItem,
}: Props) {
    const [editValues, setEditValues] = useState<InventoryItem | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setEditingId(null);
            setEditValues(null);
        } else {
            setEditingId(id);
            const item = inventoryItems.find((item) => item.id === id);
            if (item) {
                setEditValues({ ...item });
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
    };

    const renderItem = (
        item: InventoryItem,
        isEditing: boolean,
        targetId: number | null
    ) => {
        const state =
            targetId === item.id
                ? isEditing
                    ? "edited"
                    : "selected"
                : "normal";

        return (
            <InventoryItemRender
                entityProp="itemName"
                instance={isEditing && editValues ? editValues : item}
                state={state}
                context={context}
            />
        );
    };

    return (
        <GenericListGroup
            items={inventoryItems}
            targetId={targetId}
            editingId={editingId}
            onSetSelectId={setSelect}
            onToggleEditId={setEdit}
            onAdd={(name) => {
                // Handle adding new item
                console.log("Adding new item:", name);
            }}
            onDelete={(id) => {
                deleteInventoryItem.mutate({
                    params: { path: { id } },
                });
            }}
            onUpdate={(id) => {
                if (editValues) {
                    updateInventoryItem.mutate({
                        params: { path: { id } },
                        body: editValues,
                    });
                    setEditingId(null);
                    setEditValues(null);
                }
            }}
            renderItem={renderItem}
        />
    );
}
