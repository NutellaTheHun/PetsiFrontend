import {
    determineState,
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    InventoryArea,
    InventoryAreaCount,
    InventoryItem,
} from "../../entityTypes";
import { InventoryAreaDropdown } from "../components/inventoryArea/InventoryAreaDropdown";

export type InventoryAreaCountRenderContext = {
    setAreaId: (id: number | null) => void;
    editValues?: { inventoryAreaId?: number | null };
    inventoryAreas?: InventoryArea[];
};

const renderedId = (
    value: number,
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCountDate = (
    value: string,
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    if (value) {
        return <GenericValueDisplay type="date" value={value} />;
    }
    return <GenericValueDisplay value="No date" />;
};

const renderedInventoryArea = (
    _value: InventoryArea,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => {
    if (state === "edited") {
        const selectedAreaId =
            context.editValues?.inventoryAreaId ??
            entity.inventoryArea?.id ??
            null;

        return (
            <InventoryAreaDropdown
                selectedAreaId={selectedAreaId}
                onUpdateAreaId={context.setAreaId}
                inventoryAreas={context.inventoryAreas ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay
            value={entity.inventoryArea?.areaName ?? "No area"}
        />
    );
};

const renderedCountedItems = (
    value: InventoryItem[],
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length || 0} counted items`} />
    );
};

export const inventoryAreaCountPropertyRenderer: PropertyRendererRecord<InventoryAreaCount> =
    {
        id: renderedId,
        countDate: renderedCountDate,
        inventoryArea: renderedInventoryArea,
        countedItems: renderedCountedItems,
    };

export type InventoryAreaCountRenderProps = {
    entityProp: keyof InventoryAreaCount;
    currentInstance: InventoryAreaCount;
    editInstance: InventoryAreaCount | null | undefined;
    targetId: number | null;
    editingId: number | null;
    context: InventoryAreaCountRenderContext;
};

export function InventoryAreaCountRender({
    entityProp,
    currentInstance,
    editInstance,
    targetId,
    editingId,
    context,
}: InventoryAreaCountRenderProps) {
    const state = determineState(targetId, editingId, currentInstance.id);
    const entityInstance =
        state === "edited"
            ? editInstance
                ? { ...editInstance }
                : { ...currentInstance }
            : currentInstance;
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryAreaCountPropertyRenderer}
        />
    );
}
