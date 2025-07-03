import { useState } from "react";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";
import type {
    CreateInventoryAreaCountDto,
    InventoryAreaCount,
} from "../../../entityTypes";
import { useInventoryAreaCountMutations } from "../../hooks/useInventoryAreaCountMutations";
import { useInventoryAreas } from "../../hooks/useInventoryAreas";
import { InventoryAreaCountRender } from "../../property-render/InventoryAreaCount.render";

type Props = {
    inventoryAreaCounts: InventoryAreaCount[];
    targetId: number | null;
    onSetSelectId: (id: number) => void;
};

export function InventoryAreaCountListGroup({
    inventoryAreaCounts,
    targetId,
    onSetSelectId,
}: Props) {
    const {
        editContext,
        editValues,
        setEditValues,
        resetEditValues,
        createEntity,
        updateEntity,
        deleteEntity,
    } = useInventoryAreaCountMutations();

    const { inventoryAreas } = useInventoryAreas();

    const [editingId, setEditingId] = useState<number | null>(null);

    const handleToggleEdit = (id: number | null) => {
        if (id === editingId) {
            setEditingId(null);
            resetEditValues();
        } else {
            setEditingId(id);
            resetEditValues();
            const item = inventoryAreaCounts.find((item) => item.id === id);
            if (item) {
                setEditValues({
                    inventoryAreaId: item.inventoryArea?.id,
                });
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
        const firstArea = inventoryAreas?.[0];
        if (firstArea) {
            const createDto: CreateInventoryAreaCountDto = {
                inventoryAreaId: firstArea.id,
            };
            createEntity.mutate({ body: createDto });
        }
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
        item: InventoryAreaCount,
        isEditing: boolean,
        targetId: number | null
    ) => {
        const instance =
            isEditing && editValues ? { ...item, ...editValues } : item;

        return (
            <InventoryAreaCountRender
                entityProp="inventoryArea"
                currentInstance={instance}
                editInstance={isEditing ? instance : null}
                targetId={targetId}
                editingId={editingId}
                context={{
                    setAreaId: (areaId: number | null) => {
                        setEditValues({ inventoryAreaId: areaId || undefined });
                    },
                    editValues: editValues || undefined,
                    inventoryAreas: inventoryAreas || [],
                }}
            />
        );
    };

    return (
        <GenericListGroup<InventoryAreaCount>
            items={inventoryAreaCounts}
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
