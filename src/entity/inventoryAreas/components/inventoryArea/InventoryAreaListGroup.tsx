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
    selectedAreaState: [
        InventoryArea | null,
        (area: InventoryArea | null) => void
    ];
};

export function InventoryAreaListGroup({
    inventoryAreas,
    selectedAreaState,
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

    const [selectedArea, setSelectedArea] =
        selectedAreaState ?? useState<InventoryArea | null>(null);

    const [editingArea, setEditingArea] = useState<InventoryArea | null>(null);

    const statefulInventoryAreas = setStatefulData(
        inventoryAreas,
        selectedArea?.id ?? null,
        editingArea?.id ?? null,
        editInstance
    );

    const handleToggleEdit = (instance: InventoryArea | null) => {
        if (instance?.id === editingArea?.id) {
            setEditingArea(null);
            resetEditValues();
            setEditInstance(null);
        } else {
            setEditingArea(instance);
            resetEditValues();
            const item = inventoryAreas.find(
                (item) => item.id === instance?.id
            );
            if (item) {
                setEditInstance(item);
            }
        }
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
        setEditingArea(null);
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
            selectedEntityState={[selectedArea, setSelectedArea]}
            editingEntityState={[editingArea, setEditingArea]}
            onAdd={handleAddInventoryArea}
            onAddChange={handleAddInventoryAreaChange}
            onUpdate={handleUpdateInventoryArea}
            onDelete={handleDeleteInventoryArea}
            renderItem={renderItem}
        />
    );
}
