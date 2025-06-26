import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type OrderMenuItem = components["schemas"]["OrderMenuItem"];

export type OrderMenuItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setMenuItem: (id: number | null) => void;
    setSize: (id: number | null) => void;
};

export type OrderMenuItemPropertyRenderer = (
    value: any,
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => ReactNode;

export const orderMenuItemPropertyRenderer: PropertyRendererRecord<OrderMenuItem> =
    {
        id: (value, entity, state, context) =>
            renderedId(value, entity, state, context),
        order: (value, entity, state, context) =>
            renderedOrder(value, entity, state, context),
        menuItem: (value, entity, state, context) =>
            renderedMenuItem(value, entity, state, context),
        quantity: (value, entity, state, context) =>
            renderedQuantity(value, entity, state, context),
        size: (value, entity, state, context) =>
            renderedSize(value, entity, state, context),
        orderedContainerItems: (value, entity, state, context) =>
            renderedOrderedContainerItems(value, entity, state, context),
    };

export type OrderMenuItemRenderProps = {
    entityProp: keyof OrderMenuItem;
    instance: OrderMenuItem;
    state: RenderState;
    context: OrderMenuItemRenderContext;
};

export function OrderMenuItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderMenuItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={orderMenuItemPropertyRenderer}
        />
    );
}

const renderedId = (
    value: number,
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedOrder = (
    value: OrderMenuItem["order"],
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    return <GenericValue value={value?.recipient || "No order"} />;
};

const renderedMenuItem = (
    value: OrderMenuItem["menuItem"],
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setMenuItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Menu Item</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No menu item"} />;
};

const renderedQuantity = (
    value: number,
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
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

const renderedSize = (
    value: OrderMenuItem["size"],
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setSize(
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

const renderedOrderedContainerItems = (
    value: OrderMenuItem["orderedContainerItems"],
    entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    return <div>Container Items ({value?.length || 0})</div>;
};
