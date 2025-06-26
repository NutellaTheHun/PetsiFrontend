import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";

type InventoryArea = components["schemas"]["InventoryArea"];

export type InventoryAreaRenderContext = {
    setAreaName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryArea,
    _state: RenderState,
    _context: InventoryAreaRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedAreaName = (
    value: string,
    _entity: InventoryArea,
    state: RenderState,
    context: InventoryAreaRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setAreaName(e);
                }}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedInventoryCounts = (
    value: InventoryArea["inventoryCounts"],
    _entity: InventoryArea,
    _state: RenderState,
    _context: InventoryAreaRenderContext
) => {
    /* TODO: Add a link to the inventory counts */
    return <GenericValue value={`${value?.length || 0} counts`} />;
};

export const inventoryAreaPropertyRenderer: PropertyRendererRecord<InventoryArea> =
    {
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryAreaPropertyRenderer}
        />
    );
}
