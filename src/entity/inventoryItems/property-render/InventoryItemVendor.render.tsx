import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItem, InventoryItemVendor } from "../../entityTypes";

export type InventoryItemVendorRenderContext = {
    setVendorName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: InventoryItemVendor,
    _state: RenderState,
    _context: InventoryItemVendorRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedVendorName = (
    value: string,
    _entity: InventoryItemVendor,
    state: RenderState,
    context: InventoryItemVendorRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setVendorName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedVendorItems = (
    value: InventoryItem[],
    _entity: InventoryItemVendor,
    _state: RenderState,
    _context: InventoryItemVendorRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} items`} />;
};

export const inventoryItemVendorPropertyRenderer: PropertyRendererRecord<InventoryItemVendor> =
    {
        id: renderedId,
        vendorName: renderedVendorName,
        vendorItems: renderedVendorItems,
    };

export type InventoryItemVendorRenderProps = {
    entityProp: keyof InventoryItemVendor;
    instance: InventoryItemVendor;
    state: RenderState;
    context: InventoryItemVendorRenderContext;
};

export function InventoryItemVendorRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemVendorRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={inventoryItemVendorPropertyRenderer}
        />
    );
}
