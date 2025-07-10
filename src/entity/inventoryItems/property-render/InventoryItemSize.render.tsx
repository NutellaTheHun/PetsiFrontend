import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    InventoryItem,
    InventoryItemPackage,
    InventoryItemSize,
    UnitOfMeasure,
} from "../../entityTypes";
import { UnitOfMeasureDropdown } from "../../unitOfMeasure/components/unitOfMeasure/UnitOfMeasureDropdown";
import { InventoryItemSearchBarDropdown } from "../components/inventoryItem/InventoryItemSearchBarDropdown";
import { InventoryItemPackageDropdown } from "../components/InventoryItemPackage/InventoryItemPackageDropdown";

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
    return <GenericValueDisplay value={value} />;
};

const renderedMeasureAmount = (
    value: number,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <GenericInput
                type="number"
                value={value}
                onChange={(e) => context.setMeasureAmount(Number(e))}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedMeasureUnit = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext,
    dataContext?: InventoryItemSizeDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasure={value ?? null}
                onUpdateUnitOfMeasure={(unitOfMeasure) => {
                    if (unitOfMeasure) {
                        context.setMeasureUnit(unitOfMeasure);
                    }
                }}
                unitsOfMeasure={dataContext?.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.abbreviation || "No Unit"} />;
};

const renderedPackageType = (
    value: InventoryItemPackage,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext,
    dataContext?: InventoryItemSizeDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemPackageDropdown
                selectedPackage={value ?? null}
                onUpdatePackage={(pkg) => {
                    if (pkg) {
                        context.setPackageType(pkg);
                    }
                }}
                inventoryItemPackages={dataContext?.inventoryItemPackages ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.packageName || "No Package"} />;
};

const renderedInventoryItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext,
    dataContext?: InventoryItemSizeDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemSearchBarDropdown
                value={value}
                onChange={(inventoryItem) => {
                    if (inventoryItem) {
                        context.setInventoryItem(inventoryItem);
                    }
                }}
                inventoryItems={dataContext?.inventoryItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No Item"} />;
};

const renderedCost = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <GenericInput
                type="number"
                value={value}
                onChange={(e) => context.setCost(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={`$${value || "0.00"}`} />;
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
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemSizePropertyRenderer}
            dataContext={dataContext}
        />
    );
}
