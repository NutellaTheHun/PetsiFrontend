import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    InventoryAreaCount,
    InventoryAreaItem,
    InventoryItem,
    InventoryItemSize,
} from "../../entityTypes";
import { InventoryItemSearchBarDropdown } from "../../inventoryItems/components/inventoryItem/InventoryItemSearchBarDropdown";

export type InventoryAreaItemRenderContext = {
    setAmount: (amount: number) => void;
    setCountedItem: (id: number | null) => void;
    setCountedItemSize: (id: number | null) => void;
    inventoryItems?: InventoryItem[];
};

const renderedId = (
    value: number,
    _entity: InventoryAreaItem,
    _state: RenderState,
    _context: InventoryAreaItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentInventoryCount = (
    _value: InventoryAreaCount,
    _entity: InventoryAreaItem,
    _state: RenderState,
    _context: InventoryAreaItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display here"} />;
};

const renderedCountedItem = (
    value: InventoryItem,
    _entity: InventoryAreaItem,
    state: RenderState,
    context: InventoryAreaItemRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemSearchBarDropdown
                value={value?.id || ""}
                onChange={(e) => context.setCountedItem(Number(e))}
                inventoryItems={context.inventoryItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No Item"} />;
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
    return <GenericValueDisplay value={value} />;
};

// measureAmount
// measureUnit
// pacakgeType
// inventoryItem
// cost
const renderedCountedItemSize = (
    value: InventoryItemSize,
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
        <GenericValueDisplay
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
