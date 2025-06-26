import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValue } from "../../../lib/generics/propertyRenderers/GenericValue";
import { InventoryItemPackageDropdown } from "../components/InventoryItemPackage/InventoryItemPackageDropdown";

type InventoryItemSize = components["schemas"]["InventoryItemSize"];

export type InventoryItemSizeRenderContext = {
    setMeasureAmount: (amount: number) => void;
    setMeasureUnit: (id: number | null) => void;
    setPackageType: (id: number | null) => void;
    setCost: (cost: string) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryItemSize,
    _state: RenderState,
    _context: InventoryItemSizeRenderContext
) => {
    return <GenericValue value={value} />;
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
    return <GenericValue value={value} />;
};

const renderedMeasureUnit = (
    value: InventoryItemSize["measureUnit"],
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    if (state === "edited") {
        // TODO: Add a dropdown for the measure unit
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setMeasureUnit(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Unit</option>
                {/* TODO: Populate with actual units of measure */}
            </select>
        );
    }
    return <GenericValue value={value?.abbreviation || "No Unit"} />;
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
    return <GenericValue value={value?.packageName || "No Package"} />;
};

const renderedInventoryItem = (
    value: InventoryItemSize["inventoryItem"],
    _entity: InventoryItemSize,
    _state: RenderState,
    _context: InventoryItemSizeRenderContext
) => {
    // TODO: Implement this
    return <GenericValue value={value?.itemName || "No Item"} />;
};

const renderedCost = (
    value: string,
    _entity: InventoryItemSize,
    state: RenderState,
    context: InventoryItemSizeRenderContext
) => {
    // TODO add input validation
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setCost(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={`$${value || "0.00"}`} />;
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
