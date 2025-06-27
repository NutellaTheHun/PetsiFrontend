import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import { UnitOfMeasureDropdown } from "../../unitOfMeasure/components/unitOfMeasure/UnitOfMeasureDropdown";
import { InventoryItemSearchBarDropdown } from "../components/inventoryItem/InventoryItemSearchBarDropdown";
import { InventoryItemPackageDropdown } from "../components/InventoryItemPackage/InventoryItemPackageDropdown";

type InventoryItemSize = components["schemas"]["InventoryItemSize"];

export type InventoryItemSizeRenderContext = {
    setMeasureAmount: (amount: number) => void;
    setMeasureUnit: (id: number | null) => void;
    setPackageType: (id: number | null) => void;
    setCost: (cost: string) => void;
    setInventoryItem: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryItemSize,
    _state: RenderState,
    _context: InventoryItemSizeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedMeasureAmount = (
    value: number,
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
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
    value: InventoryItemSize["measureUnit"],
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasureId={value?.id || null}
                onUpdateUnitOfMeasureId={context.setMeasureUnit}
            />
        );
    }
    return <GenericValueDisplay value={value?.abbreviation || "No Unit"} />;
};

const renderedPackageType = (
    value: InventoryItemSize["packageType"],
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemPackageDropdown
                selectedPackageId={value?.id || null}
                onUpdatePackageId={context.setPackageType}
            />
        );
    }
    return <GenericValueDisplay value={value?.packageName || "No Package"} />;
};

const renderedInventoryItem = (
    value: InventoryItemSize["inventoryItem"],
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemSearchBarDropdown
                value={value?.id || ""}
                onChange={(e) => context.setInventoryItem(Number(e))}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No Item"} />;
};

const renderedCost = (
    value: string,
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
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
    instance: InventoryItemSize;
    state: RenderState;
    context: InventoryItemSizeRenderContext;
};

export function InventoryItemSizeRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemSizeRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryItemSizePropertyRenderer}
        />
    );
}
