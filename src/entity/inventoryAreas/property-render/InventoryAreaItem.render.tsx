import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
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
    setCountedItem: (entity: InventoryItem | null) => void;
    setCountedItemSize: (entity: InventoryItemSize | null) => void;
    inventoryItems?: InventoryItem[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    _context: InventoryAreaItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentInventoryCount = (
    _value: InventoryAreaCount,
    _statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    _context: InventoryAreaItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display here"} />;
};

const renderedCountedItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    context: InventoryAreaItemRenderContext
) => {
    if (statefulInstance.state === "edited") {
        return (
            <InventoryItemSearchBarDropdown
                value={value || ""}
                onChange={(e) => context.setCountedItem(e)}
                inventoryItems={context.inventoryItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No Item"} />;
};

const renderedAmount = (
    value: number,
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    context: InventoryAreaItemRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    context: InventoryAreaItemRenderContext
) => {
    // TODO: implement this
    if (statefulInstance.state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setCountedItemSize(
                        e.target.value
                            ? ({
                                  id: Number(e.target.value),
                              } as InventoryItemSize)
                            : null
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
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>;
    context: InventoryAreaItemRenderContext;
};

export function InventoryAreaItemRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryAreaItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryAreaItemPropertyRenderer}
        />
    );
}
