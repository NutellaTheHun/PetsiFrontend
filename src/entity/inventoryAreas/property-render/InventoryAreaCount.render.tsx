import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import { InventoryAreaDropdown } from "../components/inventoryArea/InventoryAreaDropdown";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];

export type InventoryAreaCountRenderContext = {
    setAreaId: (id: number | null) => void;
    editValues?: { inventoryAreaId?: number | null };
};

const renderedId = (
    value: any,
    _entity: InventoryAreaCount,
    _state: RenderState,
    _context: InventoryAreaCountRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCountDate = (
    value: any,
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
    _value: any,
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
    value: any,
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
    instance: InventoryAreaCount;
    state: RenderState;
    context: InventoryAreaCountRenderContext;
};

export function InventoryAreaCountRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryAreaCountRenderProps) {
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
