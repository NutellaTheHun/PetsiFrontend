import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type InventoryAreaItem = components["schemas"]["InventoryAreaItem"];

export type InventoryAreaItemRenderContext = {
    setAmount: (amount: number) => void;
    setCountedItem: (id: number | null) => void;
    setCountedItemSize: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryAreaItem,
    _state: RenderState,
    _context: InventoryAreaItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentInventoryCount = (
    value: InventoryAreaItem["parentInventoryCount"],
    _entity: InventoryAreaItem,
    _state: RenderState,
    _context: InventoryAreaItemRenderContext
) => {
    // TODO: Add a link to the inventory count
    return <GenericValue value={`Count #${value?.id || "N/A"}`} />;
};

const renderedCountedItem = (
    value: InventoryAreaItem["countedItem"],
    _entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    // TODO: Add a link to the inventory item, searchbar dropdown
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
    _entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="number"
                value={value}
                onChange={(e) => context.setAmount(Number(e))}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedCountedItemSize = (
    value: InventoryAreaItem["countedItemSize"],
    _entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    // TODO: implement this
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

export const inventoryAreaItemPropertyRenderer: PropertyRendererRecord<InventoryAreaItem> =
    {
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryAreaItemPropertyRenderer}
        />
    );
}
