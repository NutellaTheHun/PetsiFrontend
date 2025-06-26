import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";

type OrderMenuItem = components["schemas"]["OrderMenuItem"];

export type OrderMenuItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setMenuItem: (id: number | null) => void;
    setSize: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: OrderMenuItem,
    _state: RenderState,
    _context: OrderMenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedOrder = (
    value: OrderMenuItem["order"],
    _entity: OrderMenuItem,
    _state: RenderState,
    _context: OrderMenuItemRenderContext
) => {
    // TODO implement
    return <GenericValue value={value?.recipient || "No order"} />;
};

const renderedMenuItem = (
    value: OrderMenuItem["menuItem"],
    _entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                // MenuItem searchbar dropdown
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
    _entity: OrderMenuItem,
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
    _entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            // MenuItemSize dropdown? Or just columns of sizes?
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
    _entity: OrderMenuItem,
    _state: RenderState,
    _context: OrderMenuItemRenderContext
) => {
    // TODO implement
    return <div>Container Items ({value?.length || 0})</div>;
};

export const orderMenuItemPropertyRenderer: PropertyRendererRecord<OrderMenuItem> =
    {
        id: renderedId,
        order: renderedOrder,
        menuItem: renderedMenuItem,
        quantity: renderedQuantity,
        size: renderedSize,
        orderedContainerItems: renderedOrderedContainerItems,
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
