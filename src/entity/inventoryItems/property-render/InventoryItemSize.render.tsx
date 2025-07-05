import {
    GenericEntityPropertyRenderer,
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
    setMeasureUnit: (id: number | null) => void;
    setPackageType: (id: number | null) => void;
    setCost: (cost: string) => void;
    setInventoryItem: (id: number | null) => void;
    inventoryItemPackages?: InventoryItemPackage[];
    inventoryItems?: InventoryItem[];
    unitsOfMeasure?: UnitOfMeasure[];
};

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
    context: InventoryItemSizeRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasureId={value?.id || null}
                onUpdateUnitOfMeasureId={context.setMeasureUnit}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.abbreviation || "No Unit"} />;
};

const renderedPackageType = (
    value: InventoryItemPackage,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemPackageDropdown
                selectedPackage={value ?? null}
                onUpdatePackage={(pkg) =>
                    context.setPackageType(pkg?.id ?? null)
                }
                inventoryItemPackages={context.inventoryItemPackages ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.packageName || "No Package"} />;
};

const renderedInventoryItem = (
    value: InventoryItem,
    statefulInstance: GenericStatefulEntity<InventoryItemSize>,
    context: InventoryItemSizeRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <InventoryItemSearchBarDropdown
                value={value}
                onChange={(inventoryItem) =>
                    context.setInventoryItem(inventoryItem?.id ?? null)
                }
                inventoryItems={context.inventoryItems ?? []}
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
};

export function InventoryItemSizeRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemSizeRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemSizePropertyRenderer}
        />
    );
}
