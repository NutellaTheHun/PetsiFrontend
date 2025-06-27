import type { components } from "../../../api-types";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type OrderContainerItem = components["schemas"]["OrderContainerItem"];

export type OrderContainerItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setContainedItem: (id: number | null) => void;
    setContainedItemSize: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: OrderContainerItem,
    _state: RenderState,
    _context: OrderContainerItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentOrderItem = (
    value: OrderContainerItem["parentOrderItem"],
    _entity: OrderContainerItem,
    _state: RenderState,
    _context: OrderContainerItemRenderContext
) => {
    return (
        // TODO implement
        <GenericValueDisplay
            value={value?.menuItem?.itemName || "No parent item"}
        />
    );
};

const renderedContainedItem = (
    value: OrderContainerItem["containedItem"],
    _entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        // TODO implement
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
    return (
        <GenericValueDisplay value={value?.itemName || "No contained item"} />
    );
};

const renderedContainedItemSize = (
    value: OrderContainerItem["containedItemSize"],
    _entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        return (
            // TODO implement
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
    return <GenericValueDisplay value={value?.name || "No size"} />;
};

const renderedQuantity = (
    value: number,
    _entity: OrderContainerItem,
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
    return <GenericValueDisplay value={value} />;
};

export const orderContainerItemPropertyRenderer: PropertyRendererRecord<OrderContainerItem> =
    {
        id: renderedId,
        parentOrderItem: renderedParentOrderItem,
        containedItem: renderedContainedItem,
        containedItemSize: renderedContainedItemSize,
        quantity: renderedQuantity,
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={orderContainerItemPropertyRenderer}
        />
    );
}
