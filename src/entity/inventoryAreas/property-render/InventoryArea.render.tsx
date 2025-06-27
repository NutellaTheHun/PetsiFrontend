import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryAreaCount } from "../../entityTypes";

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
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedInventoryCounts = (
    value: InventoryAreaCount[],
    _entity: InventoryArea,
    _state: RenderState,
    _context: InventoryAreaRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} counts`} />;
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
