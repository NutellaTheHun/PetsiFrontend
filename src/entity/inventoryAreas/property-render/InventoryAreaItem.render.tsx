import { NumberInput, Text } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MantineAutoComplete } from "../../../lib/uiComponents/input/MantineAutoComplete";
import type {
    InventoryAreaCount,
    InventoryAreaItem,
    InventoryItem,
    InventoryItemSize,
} from "../../entityTypes";

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
    return <Text>{value}</Text>;
};

const renderedParentInventoryCount = (
    _value: InventoryAreaCount,
    _statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    _context: InventoryAreaItemRenderContext
) => {
    return <Text>{"Nothing to display here"}</Text>;
};

const renderedCountedItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    context: InventoryAreaItemRenderContext,
    dataContext?: InventoryAreaItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<InventoryItem>
                totalOptions={dataContext?.inventoryItems ?? []}
                selectedOption={value}
                onOptionChange={context.setCountedItem}
                searchProperty="itemName"
            />
        );
    }
    return <Text>{value?.itemName || "No Item"}</Text>;
};

const renderedAmount = (
    value: number,
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    context: InventoryAreaItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => context.setAmount(Number(e))}
            />
        );
    }
    return <Text>{value}</Text>;
};

// measureAmount
// measureUnit
// pacakgeType
// inventoryItem
// cost
// TODO: Make this a dropdown
const renderedCountedItemSize = (
    value: InventoryItemSize,
    statefulInstance: GenericStatefulEntity<InventoryAreaItem>,
    _context: InventoryAreaItemRenderContext,
    _dataContext?: InventoryAreaItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return <div>MUST MAKE DROPDOWN</div>;
    }
    return (
        <Text>
            {`${value?.measureAmount} ${
                value?.measureUnit?.abbreviation || ""
            }`}
        </Text>
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
