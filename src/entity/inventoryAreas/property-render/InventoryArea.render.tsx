import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryAreaCount } from "../../entityTypes";

type InventoryArea = components["schemas"]["InventoryArea"];

export type InventoryAreaRenderContext = {
    setAreaName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryArea>,
    _context: InventoryAreaRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedAreaName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryArea>,
    context: InventoryAreaRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    _statefulInstance: GenericStatefulEntity<InventoryArea>,
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
    statefulInstance: GenericStatefulEntity<InventoryArea>;
    context: InventoryAreaRenderContext;
};

export function InventoryAreaRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryAreaRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryAreaPropertyRenderer}
        />
    );
}
