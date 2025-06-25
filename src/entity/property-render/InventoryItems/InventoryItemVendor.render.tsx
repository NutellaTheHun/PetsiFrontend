import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

export type InventoryItemVendorRenderContext = {
    setVendorName: (name: string) => void;
};

export type InventoryItemVendorPropertyRenderer = (
    value: any,
    entity: InventoryItemVendor,
    state: RenderState,
    context: InventoryItemVendorRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: InventoryItemVendor,
    state: RenderState,
    context: InventoryItemVendorRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedVendorName = (
    value: string,
    entity: InventoryItemVendor,
    state: RenderState,
    context: InventoryItemVendorRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setVendorName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedVendorItems = (
    value: InventoryItemVendor["vendorItems"],
    entity: InventoryItemVendor,
    state: RenderState,
    context: InventoryItemVendorRenderContext
) => {
    return <GenericValue value={`${value?.length || 0} items`} />;
};

export const inventoryItemVendorPropertyRenderer: Record<
    keyof InventoryItemVendor,
    InventoryItemVendorPropertyRenderer
> = {
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
    const renderer = inventoryItemVendorPropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
