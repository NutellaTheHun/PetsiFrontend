import { useState } from "react";
import {
    setStatefulData,
    type GenericStatefulEntity,
} from "../../../../lib/generics/GenericStatefulEntity";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";
import type { InventoryArea } from "../../../entityTypes";
import { useInventoryAreaMutations } from "../../hooks/useInventoryAreaMutations";
import { InventoryAreaRender } from "../../property-render/InventoryArea.render";

type Props = {
    inventoryAreas: InventoryArea[];
    selectedAreaIdState: [number | null, (id: number | null) => void];
};

export function InventoryAreaListGroup({
    inventoryAreas,
    selectedAreaIdState,
}: Props) {
    const {
        editContext,
        editInstance,
        setEditInstance,
        createContext,
        createInstance,
        setCreateInstance,
        resetEditValues,
        resetCreateValues,
        handleAdd,
        handleUpdate,
        handleDelete,
    } = useInventoryAreaMutations();

    const [selectedAreaId, setSelectedAreaId] =
        selectedAreaIdState ?? useState<number | null>(null);

    const [editingId, setEditingId] = useState<number | null>(null);

    const statefulInventoryAreas = setStatefulData(
        inventoryAreas,
        selectedAreaId,
        editingId,
        editInstance
    );

    const handleToggleEdit = (id: number | null) => {
        if (id === editingId) {
            setEditingId(null);
            resetEditValues();
            setEditInstance(null);
        } else {
            setEditingId(id);
            resetEditValues();
            const item = inventoryAreas.find((item) => item.id === id);
            if (item) {
                setEditInstance(item);
            }
        }
    };

    const handleSetSelectId = (id: number | null) => {
        if (id === selectedAreaId) return;
        setSelectedAreaId(id);
        setEditingId(null);
        resetEditValues();
    };

    const handleAddInventoryAreaChange = (name: string) => {
        createContext.setAreaName(name);
    };

    const handleAddInventoryArea = (name: string) => {
        if (createInstance) {
            handleAdd(createInstance);
        }
    };

    const handleUpdateInventoryArea = (id: number) => {
        handleUpdate(id);
        setEditingId(null);
    };

    const handleDeleteInventoryArea = (id: number) => {
        handleDelete(id);
    };

    const renderItem = (item: GenericStatefulEntity<InventoryArea>) => {
        return (
            <InventoryAreaRender
                entityProp="areaName"
                statefulInstance={item}
                context={editContext}
            />
        );
    };

    return (
        <GenericListGroup<InventoryArea>
            items={statefulInventoryAreas}
            selectedIdState={[selectedAreaId, handleSetSelectId]}
            editingIdState={[editingId, handleToggleEdit]}
            onAdd={handleAddInventoryArea}
            onAddChange={handleAddInventoryAreaChange}
            onUpdate={handleUpdateInventoryArea}
            onDelete={handleDeleteInventoryArea}
            renderItem={renderItem}
        />
    );
}
