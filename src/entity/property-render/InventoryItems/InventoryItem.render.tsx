import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { InventoryItemCategoryDropdown } from "../../../features/admin/components/inventory-item/InventoryItemCategoryDropdown";
import { InventoryItemVendorDropdown } from "../../../features/admin/components/inventory-item/InventoryItemVendorDropdown";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryItem = components["schemas"]["InventoryItem"];

export type InventoryItemRenderContext = {
    setItemName: (name: string) => void;
    setCategory: (id: number | null) => void;
    setVendor: (id: number | null) => void;
    //setItemSizes: (sizes: InventoryItem["itemSizes"]) => void;
};

export type InventoryItemProperyRenderer = (
    value: any,
    entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => ReactNode;

export const inventoryItemProperyRenderer: Record<
    keyof InventoryItem,
    InventoryItemProperyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    itemName: (value, entity, state, context) =>
        renderedItemName(value, entity, state, context),
    category: (value, entity, state, context) =>
        renderedCategory(value, entity, state, context),
    vendor: (value, entity, state, context) =>
        renderedVendor(value, entity, state, context),
    itemSizes: (value, entity, state, context) =>
        renderedItemSizes(value, entity, state, context),
};

export type InventoryItemRenderProps = {
    entityProp: keyof InventoryItem;
    instance: InventoryItem;
    state: RenderState;
    context: InventoryItemRenderContext;
};

export function InventoryItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = inventoryItemProperyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedItemName = (
    value: string,
    entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setItemName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedCategory = (
    value: InventoryItem["category"],
    entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={(id) => {
                    context.setCategory(id);
                }}
            />
        );
    }
    return <GenericValue value={value?.categoryName ?? ""} />;
};

const renderedVendor = (
    value: InventoryItem["vendor"],
    entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    if (state === "edited") {
        return (
            <InventoryItemVendorDropdown
                selectedVendorId={value?.id ?? null}
                onUpdateVendorId={(id) => {
                    context.setVendor(id);
                }}
            />
        );
    }
    return <GenericValue value={value?.vendorName ?? ""} />;
};

const renderedItemSizes = (
    value: InventoryItem["itemSizes"],
    entity: InventoryItem,
    state: RenderState,
    context: InventoryItemRenderContext
) => {
    return <div>item size</div>;
};
