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

    //const [editingArea, setEditingArea] = useState<InventoryArea | null>(null);

    const statefulInventoryAreas = setStatefulData(
        inventoryAreas,
        editInstance,
        selectedArea?.id ?? null,
        editInstance?.id ?? null
    );

    const handleToggleEdit = (instance: InventoryArea | null) => {
        if (instance?.id === editInstance?.id) {
            resetEditValues();
            setEditInstance(null);
        } else {
            setEditInstance(instance);
            resetEditValues();
            const item = inventoryAreas.find(
                (item) => item.id === instance?.id
            );
            if (item) {
                setEditInstance(item);
            }
        }
    };

    const handleAddInventoryArea = () => {
        if (createInstance) {
            handleAdd();
            resetCreateValues();
        }
    };

    const handleUpdateInventoryArea = () => {
        handleUpdate();
        resetEditValues();
    };

    const handleDeleteInventoryArea = (id: number) => {
        handleDelete(id);
    };

    // Wrapper functions to fix type compatibility
    /*const setCreateInstanceWrapper = (
        entity: Partial<InventoryArea> | null
    ) => {
        setCreateInstance(entity);
    };

    const setEditInstanceWrapper = (entity: Partial<InventoryArea> | null) => {
        setEditInstance(entity);
    };*/

    const renderItem = (
        item: GenericStatefulEntity<InventoryArea>,
        context: "edit" | "create"
    ) => {
        return (
            <InventoryAreaRender
                entityProp="areaName"
                statefulInstance={item}
                context={context === "edit" ? editContext : createContext}
            />
        );
    };

    return (
        <GenericListGroup<InventoryArea>
            items={statefulInventoryAreas}
            selectedEntityState={[selectedArea, setSelectedArea]}
            editingEntityState={[editInstance, setEditInstance]}
            createEntityState={[createInstance, setCreateInstance]}
            onCreate={handleAddInventoryArea}
            onUpdate={handleUpdateInventoryArea}
            onDelete={handleDeleteInventoryArea}
            renderItem={renderItem}
        />
    );
}
