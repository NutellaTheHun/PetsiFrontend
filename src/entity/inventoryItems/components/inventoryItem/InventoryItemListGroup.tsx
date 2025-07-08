import { useState } from "react";
import {
    setStatefulData,
    type GenericStatefulEntity,
} from "../../../../lib/generics/GenericStatefulEntity";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";
import type { InventoryItem } from "../../../entityTypes";
import { RenderInventoryItemProperty } from "../../property-render/InventoryItem.render";

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

    const renderItem = (item: GenericStatefulEntity<InventoryItem>) => {
        return (
            <RenderInventoryItemProperty
                entityProp="itemName"
                statefulInstance={item}
                context={context}
            />
        );
    };

    return (
        <GenericListGroup<InventoryItem>
            items={statefulInventoryItems}
            selectedIdState={[targetId, setTargetId]}
            editingIdState={[editingId, setEditingId]}
            onCreate={(name) => {
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
            renderProperty={renderItem}
        />
    );
}
