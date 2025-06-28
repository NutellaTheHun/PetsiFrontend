import { useState } from "react";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";
import type {
    CreateInventoryAreaDto,
    InventoryArea,
} from "../../../entityTypes";
import { useInventoryAreaMutations } from "../../hooks/useInventoryAreaMutations";
import { InventoryAreaRender } from "../../property-render/InventoryArea.render";

type Props = {
    inventoryAreas: InventoryArea[];
    targetId: number | null;
    onSetSelectId: (id: number) => void;
};

export function InventoryAreaListGroup({
    inventoryAreas,
    targetId,
    onSetSelectId,
}: Props) {
    const {
        editContext,
        editValues,
        setEditValues,
        resetEditValues,
        createContext,
        createValues,
        setCreateValues,
        resetCreateValues,
        resetAll,
        createEntity,
        updateEntity,
        deleteEntity,
    } = useInventoryAreaMutations();

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleToggleEdit = (id: number | null) => {
        if (id === editingId) {
            setEditingId(null);
            resetEditValues();
        } else {
            setEditingId(id);
            resetEditValues();
            const item = inventoryAreas.find((item) => item.id === id);
            if (item) {
                setEditValues({ ...item });
            }
        }
    };

    const handleSetSelectId = (id: number) => {
        if (id === targetId) return;
        onSetSelectId(id);
        setEditingId(null);
        resetEditValues();
    };

    const handleAdd = (name: string) => {
        createContext.setAreaName(name);

        const createDto: CreateInventoryAreaDto = {
            areaName: name,
        };

        createEntity.mutate({ body: createDto });
        resetCreateValues();
    };

    const handleUpdate = (id: number) => {
        if (!editValues) return;

        updateEntity.mutate({
            params: { path: { id } },
            body: editValues,
        });

        setEditingId(null);
        resetEditValues();
    };

    const handleDelete = (id: number) => {
        deleteEntity.mutate({ params: { path: { id } } });
    };

    const renderItem = (
        item: InventoryArea,
        isEditing: boolean,
        targetId: number | null
    ) => {
        const state =
            targetId === item.id
                ? isEditing
                    ? "edited"
                    : "selected"
                : "normal";

        // When editing, merge the original item with edit values to ensure we have a complete InventoryArea
        const instance =
            isEditing && editValues ? { ...item, ...editValues } : item;

        return (
            <InventoryAreaRender
                entityProp="areaName"
                instance={instance}
                state={state}
                context={editContext}
            />
        );
    };

    return (
        <GenericListGroup<InventoryArea>
            items={inventoryAreas}
            targetId={targetId}
            editingId={editingId}
            onSetSelectId={handleSetSelectId}
            onToggleEditId={handleToggleEdit}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            renderItem={renderItem}
        />
    );
}
