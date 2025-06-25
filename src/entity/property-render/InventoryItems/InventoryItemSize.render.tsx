import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryItemSize = components["schemas"]["InventoryItemSize"];

export type InventoryItemSizeRenderContext = {
    setMeasureAmount: (amount: number) => void;
    setMeasureUnit: (id: number | null) => void;
    setPackageType: (id: number | null) => void;
    setCost: (cost: string) => void;
};

export type InventoryItemSizePropertyRenderer = (
    value: any,
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedMeasureAmount = (
    value: number,
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="number"
                value={value || ""}
                onChange={(e) =>
                    context.setMeasureAmount(Number(e.target.value))
                }
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedMeasureUnit = (
    value: InventoryItemSize["measureUnit"],
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setMeasureUnit(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Unit</option>
                {/* TODO: Populate with actual units of measure */}
            </select>
        );
    }
    return <GenericValue value={value?.abbreviation || "No Unit"} />;
};

const renderedPackageType = (
    value: InventoryItemSize["packageType"],
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setPackageType(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Package</option>
                {/* TODO: Populate with actual package types */}
            </select>
        );
    }
    return <GenericValue value={value?.packageName || "No Package"} />;
};

const renderedInventoryItem = (
    value: InventoryItemSize["inventoryItem"],
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    return <GenericValue value={value?.itemName || "No Item"} />;
};

const renderedCost = (
    value: string,
    entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setCost(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={`$${value || "0.00"}`} />;
};

export const inventoryItemSizePropertyRenderer: Record<
    keyof InventoryItemSize,
    InventoryItemSizePropertyRenderer
> = {
    id: renderedId,
    measureAmount: renderedMeasureAmount,
    measureUnit: renderedMeasureUnit,
    packageType: renderedPackageType,
    inventoryItem: renderedInventoryItem,
    cost: renderedCost,
};

export type InventoryItemSizeRenderProps = {
    entityProp: keyof InventoryItemSize;
    instance: InventoryItemSize;
    state: RenderState;
    context: InventoryItemSizeRenderContext;
};

export function InventoryItemSizeRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemSizeRenderProps) {
    const renderer = inventoryItemSizePropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
