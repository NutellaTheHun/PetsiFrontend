import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export type InventoryAreaItemRenderContext = {
    setAmount: (amount: number) => void;
    setCountedItem: (id: number | null) => void;
    setCountedItemSize: (id: number | null) => void;
};

export type InventoryAreaItemPropertyRenderer = (
    value: any,
    entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentInventoryCount = (
    value: InventoryAreaItem["parentInventoryCount"],
    entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    return <GenericValue value={`Count #${value?.id || "N/A"}`} />;
};

const renderedCountedItem = (
    value: InventoryAreaItem["countedItem"],
    entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setCountedItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Item</option>
                {/* TODO: Populate with actual inventory items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No Item"} />;
};

const renderedAmount = (
    value: number,
    entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="number"
                value={value || ""}
                onChange={(e) => context.setAmount(Number(e.target.value))}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedCountedItemSize = (
    value: InventoryAreaItem["countedItemSize"],
    entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setCountedItemSize(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Size</option>
                {/* TODO: Populate with actual item sizes */}
            </select>
        );
    }
    return (
        <GenericValue
            value={`${value?.measureAmount} ${
                value?.measureUnit?.abbreviation || ""
            }`}
        />
    );
};

export const inventoryAreaItemPropertyRenderer: Record<
    keyof InventoryAreaItem,
    InventoryAreaItemPropertyRenderer
> = {
    id: renderedId,
    parentInventoryCount: renderedParentInventoryCount,
    countedItem: renderedCountedItem,
    amount: renderedAmount,
    countedItemSize: renderedCountedItemSize,
};

export type InventoryAreaItemRenderProps = {
    entityProp: keyof InventoryAreaItem;
    instance: InventoryAreaItem;
    state: RenderState;
    context: InventoryAreaItemRenderContext;
};

export function InventoryAreaItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryAreaItemRenderProps) {
    const renderer = inventoryAreaItemPropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
