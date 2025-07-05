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
    externalSelectedArea: [
        InventoryArea | null,
        (area: InventoryArea | null) => void
    ];
};

export function InventoryAreaListGroup({
    inventoryAreas,
    externalSelectedArea,
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
        createEntity,
        updateEntity,
        deleteEntity,
    } = useInventoryAreaMutations();

    const [selectedArea, setSelectedArea] =
        externalSelectedArea ?? useState<InventoryArea | null>(null);

    const statefulInventoryAreas = setStatefulData(
        inventoryAreas,
        editInstance,
        selectedArea?.id ?? null,
        editInstance?.id ?? null
    );

    const handleAddInventoryArea = () => {
        if (createInstance) {
            createEntity();
            resetCreateValues();
        }
    };

    const handleUpdateInventoryArea = () => {
        updateEntity();
        resetEditValues();
    };

    const handleDeleteInventoryArea = (id: number) => {
        deleteEntity(id);
    };

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
