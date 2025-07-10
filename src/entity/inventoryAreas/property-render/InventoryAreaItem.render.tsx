import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
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
    setCountedItem: (entity: InventoryItem) => void;
    setCountedItemSize: (entity: InventoryItemSize) => void;
    setParentInventoryCount?: (entity: InventoryAreaCount) => void; // For create contexts only
};

export interface InventoryAreaItemDataContext
    extends EntityDataContext<InventoryAreaItem> {
    inventoryItems?: InventoryItem[];
    inventoryItemSizes?: InventoryItemSize[];
}

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
    context: InventoryAreaItemRenderContext,
    dataContext?: InventoryAreaItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemSearchBarDropdown
                value={value || ""}
                onChange={(e) => context.setCountedItem(e)}
                inventoryItems={dataContext?.inventoryItems ?? []}
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
    if (statefulInstance.state === "edit") {
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
    _context: InventoryAreaItemRenderContext,
    dataContext?: InventoryAreaItemDataContext
) => {
    if (
        statefulInstance.state === "edit" ||
        statefulInstance.state === "create"
    ) {
        return <div>MUST MAKE DROPDOWN</div>;
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
    dataContext?: InventoryAreaItemDataContext;
};

export function InventoryAreaItemRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: InventoryAreaItemRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryAreaItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
