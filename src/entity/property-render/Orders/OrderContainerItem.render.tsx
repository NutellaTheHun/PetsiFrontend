import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type OrderContainerItem = components["schemas"]["OrderContainerItem"];

export type OrderContainerItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setContainedItem: (id: number | null) => void;
    setContainedItemSize: (id: number | null) => void;
};

export type OrderContainerItemPropertyRenderer = (
    value: any,
    entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => ReactNode;

export const orderContainerItemPropertyRenderer: Record<
    keyof OrderContainerItem,
    OrderContainerItemPropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    parentOrderItem: (value, entity, state, context) =>
        renderedParentOrderItem(value, entity, state, context),
    containedItem: (value, entity, state, context) =>
        renderedContainedItem(value, entity, state, context),
    containedItemSize: (value, entity, state, context) =>
        renderedContainedItemSize(value, entity, state, context),
    quantity: (value, entity, state, context) =>
        renderedQuantity(value, entity, state, context),
};

export type OrderContainerItemRenderProps = {
    entityProp: keyof OrderContainerItem;
    instance: OrderContainerItem;
    state: RenderState;
    context: OrderContainerItemRenderContext;
};

export function OrderContainerItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderContainerItemRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = orderContainerItemPropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentOrderItem = (
    value: OrderContainerItem["parentOrderItem"],
    entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    return (
        <GenericValue value={value?.menuItem?.itemName || "No parent item"} />
    );
};

const renderedContainedItem = (
    value: OrderContainerItem["containedItem"],
    entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setContainedItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Contained Item</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No contained item"} />;
};

const renderedContainedItemSize = (
    value: OrderContainerItem["containedItemSize"],
    entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setContainedItemSize(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Size</option>
                {/* TODO: Populate with actual sizes */}
            </select>
        );
    }
    return <GenericValue value={value?.name || "No size"} />;
};

const renderedQuantity = (
    value: number,
    entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};
