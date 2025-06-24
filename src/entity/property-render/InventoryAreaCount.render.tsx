import type { ReactNode } from "react";
import type { components } from "../../api-types";
import { InventoryAreaDropdown } from "../../features/admin/components/inventory-area/InventoryAreaDropdown";
import { GenericValue } from "../../features/shared-components/table/render-cell-content/GenericValue";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];
type InventoryArea = components["schemas"]["InventoryArea"];
type InventoryItem = components["schemas"]["InventoryItem"];

type RenderState = "normal" | "selected" | "edited";

// Context object for all stateful values and setters needed by renderers
export type InventoryAreaCountRenderContext = {
    setAreaId: (id: number | null) => void;
    targetId: number | null;
    isEditing: boolean;
};

// PropertyRenderer now takes context as the fourth argument
export type PropertyRenderer = (
    value: any,
    entity: InventoryAreaCount,
    state: RenderState,
    context: InventoryAreaCountRenderContext
) => ReactNode;

export interface entityRenderMap<T> {
    key: keyof T;
    render: PropertyRenderer;
}

export const inventoryAreaCountRenderMap: Record<
    keyof InventoryAreaCount,
    PropertyRenderer
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
        return (
            <InventoryAreaDropdown
                selectedAreaId={entity.inventoryArea?.id ?? null}
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
