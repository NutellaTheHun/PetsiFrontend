import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItem, InventoryItemVendor } from "../../entityTypes";

export type InventoryItemVendorRenderContext = {
    setVendorName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<InventoryItemVendor>,
    _context: InventoryItemVendorRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedVendorName = (
    value: string,
    statefulInstance: GenericStatefulEntity<InventoryItemVendor>,
    context: InventoryItemVendorRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    _statefulInstance: GenericStatefulEntity<InventoryItemVendor>,
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
    statefulInstance: GenericStatefulEntity<InventoryItemVendor>;
    context: InventoryItemVendorRenderContext;
};

export function InventoryItemVendorRender({
    entityProp,
    statefulInstance,
    context,
}: InventoryItemVendorRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={inventoryItemVendorPropertyRenderer}
        />
    );
}
