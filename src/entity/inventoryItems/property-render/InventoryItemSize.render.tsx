import { NumberInput, Text } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import { DropdownSelection } from "../../../lib/uiComponents/input/DropdownSelection";
import { SearchbarDropdownSelection } from "../../../lib/uiComponents/input/SearchbarDropdownSelection";
import type {
    InventoryItem,
    InventoryItemPackage,
    InventoryItemSize,
    UnitOfMeasure,
} from "../../entityTypes";

export type InventoryItemSizeRenderContext = {
    setMeasureAmount: (amount: number) => void;
    setMeasureUnit: (entity: UnitOfMeasure) => void;
    setPackageType: (entity: InventoryItemPackage) => void;
    setCost: (cost: string) => void;
    setInventoryItem: (entity: InventoryItem) => void;
};

export interface InventoryItemSizeDataContext
    extends EntityDataContext<InventoryItemSize> {
    inventoryItemPackages?: InventoryItemPackage[];
    inventoryItems?: InventoryItem[];
    unitsOfMeasure?: UnitOfMeasure[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    _context: InventoryItemSizeRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedMeasureAmount = (
    value: number,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => context.setMeasureAmount(Number(e))}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedMeasureUnit = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext,
    dataContext?: InventoryItemSizeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<UnitOfMeasure>
                totalOptions={dataContext?.unitsOfMeasure ?? []}
                selectedOption={value}
                onOptionChange={context.setMeasureUnit}
                labelKey="abbreviation"
            />
        );
    }
    return <Text>{value?.abbreviation || "No Unit"}</Text>;
};

const renderedPackageType = (
    value: InventoryItemPackage,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext,
    dataContext?: InventoryItemSizeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<InventoryItemPackage>
                totalOptions={dataContext?.inventoryItemPackages ?? []}
                selectedOption={value}
                onOptionChange={context.setPackageType}
                labelKey="packageName"
            />
        );
    }
    return <Text>{value?.packageName || "No Package"}</Text>;
};

const renderedInventoryItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext,
    dataContext?: InventoryItemSizeDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <SearchbarDropdownSelection<InventoryItem>
                totalOptions={dataContext?.inventoryItems ?? []}
                selectedOption={value}
                onOptionChange={context.setInventoryItem}
                searchProperty="itemName"
            />
        );
    }
    return <Text>{value?.itemName || "No Item"}</Text>;
};

const renderedCost = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => context.setCost(e.toString())}
            />
        );
    }
    return <Text>{`$${value || "0.00"}`}</Text>;
};

export const inventoryItemSizePropertyRenderer: PropertyRendererRecord<InventoryItemSize> =
    {
        id: renderedId,
        measureAmount: renderedMeasureAmount,
        measureUnit: renderedMeasureUnit,
        packageType: renderedPackageType,
        inventoryItem: renderedInventoryItem,
        cost: renderedCost,
    };

export type InventoryItemSizeRenderProps = {
    entityProp: keyof InventoryItemSize;
    statefulInstance: GenericStatefulEntity<InventoryItemSize>;
    context: InventoryItemSizeRenderContext;
    dataContext?: InventoryItemSizeDataContext;
};

export function InventoryItemSizeRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: InventoryItemSizeRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemSizePropertyRenderer}
            dataContext={dataContext}
        />
    );
}
