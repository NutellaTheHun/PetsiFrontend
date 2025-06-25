import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export type InventoryItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

export type InventoryItemCategoryPropertyRenderer = (
    value: any,
    entity: InventoryItemCategory,
    state: RenderState,
    context: InventoryItemCategoryRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: InventoryItemCategory,
    state: RenderState,
    context: InventoryItemCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    entity: InventoryItemCategory,
    state: RenderState,
    context: InventoryItemCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setCategoryName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedCategoryItems = (
    value: InventoryItemCategory["categoryItems"],
    entity: InventoryItemCategory,
    state: RenderState,
    context: InventoryItemCategoryRenderContext
) => {
    return <GenericValue value={`${value?.length || 0} items`} />;
};

export const inventoryItemCategoryPropertyRenderer: Record<
    keyof InventoryItemCategory,
    InventoryItemCategoryPropertyRenderer
> = {
    id: renderedId,
    categoryName: renderedCategoryName,
    categoryItems: renderedCategoryItems,
};

export type InventoryItemCategoryRenderProps = {
    entityProp: keyof InventoryItemCategory;
    instance: InventoryItemCategory;
    state: RenderState;
    context: InventoryItemCategoryRenderContext;
};

export function InventoryItemCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: InventoryItemCategoryRenderProps) {
    const renderer = inventoryItemCategoryPropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
