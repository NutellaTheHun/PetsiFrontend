import type { ReactNode } from "react";
import type { components } from "../../api-types";
import { InventoryAreaDropdown } from "../../features/admin/components/inventory-area/InventoryAreaDropdown";
import { GenericValue } from "../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "./render-types";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];

// Context object for all stateful values and setters needed by renderers
export type InventoryAreaCountRenderContext = {
    setAreaId: (id: number | null) => void;
    editValues?: { inventoryAreaId?: number | null };
};

// PropertyRenderer now takes context as the fourth argument
export type InventoryAreaCountPropertyRenderer = (
    value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => ReactNode;

export const inventoryAreaCountRenderMap: Record<
    keyof InventoryAreaCount,
    InventoryAreaCountPropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    countDate: (value, entity, state, context) =>
        renderedCountDate(value, entity, state, context),
    inventoryArea: (value, entity, state, context) =>
        renderedInventoryArea(value, entity, state, context),
    countedItems: (value, entity, state, context) =>
        renderedCountedItems(value, entity, state, context),
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
    const value = entityInstance[entityProp];
    const renderer = inventoryAreaCountRenderMap[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

// --- Renderers for each property ---

const renderedId = (
    value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCountDate = (
    value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedInventoryArea = (
    value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => {
    if (state === "edited") {
        // Use editValues if available, otherwise fall back to entity value
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
    return <GenericValue value={entity.inventoryArea?.areaName ?? "No area"} />;
};

const renderedCountedItems = (
    value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => {
    return <div>countedItems</div>;
};
