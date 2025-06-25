import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryArea = components["schemas"]["InventoryArea"];

export type InventoryAreaRenderContext = {
    setAreaName: (name: string) => void;
};

export type InventoryAreaPropertyRenderer = (
    value: any,
    entity: InventoryArea,
    state: RenderState,
    context: InventoryAreaRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: InventoryArea,
    state: RenderState,
    context: InventoryAreaRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedAreaName = (
    value: string,
    entity: InventoryArea,
    state: RenderState,
    context: InventoryAreaRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setAreaName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedInventoryCounts = (
    value: InventoryArea["inventoryCounts"],
    entity: InventoryArea,
    state: RenderState,
    context: InventoryAreaRenderContext
) => {
    return <GenericValue value={`${value?.length || 0} counts`} />;
};

export const inventoryAreaPropertyRenderer: Record<
    keyof InventoryArea,
    InventoryAreaPropertyRenderer
> = {
    id: renderedId,
    areaName: renderedAreaName,
    inventoryCounts: renderedInventoryCounts,
};

export type InventoryAreaRenderProps = {
    entityProp: keyof InventoryArea;
    instance: InventoryArea;
    state: RenderState;
    context: InventoryAreaRenderContext;
};

export function InventoryAreaRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryAreaRenderProps) {
    const renderer = inventoryAreaPropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
