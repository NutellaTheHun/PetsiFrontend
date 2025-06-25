import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type MenuItemCategory = components["schemas"]["MenuItemCategory"];

export type MenuItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

export type MenuItemCategoryPropertyRenderer = (
    value: any,
    entity: MenuItemCategory,
    state: RenderState,
    context: MenuItemCategoryRenderContext
) => ReactNode;

export const menuItemCategoryPropertyRenderer: Record<
    keyof MenuItemCategory,
    MenuItemCategoryPropertyRenderer
> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    categoryName: (value, entity, state, context) =>
        renderedCategoryName(value, entity, state, context),
    categoryItems: (value, entity, state, context) =>
        renderedCategoryItems(value, entity, state, context),
};

export type MenuItemCategoryRenderProps = {
    entityProp: keyof MenuItemCategory;
    instance: MenuItemCategory;
    state: RenderState;
    context: MenuItemCategoryRenderContext;
};

export function MenuItemCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemCategoryRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = menuItemCategoryPropertyRenderer[entityProp];
    if (!renderer) return null;
    return renderer(value, entityInstance, state, context);
}

const renderedId = (
    value: number,
    entity: MenuItemCategory,
    state: RenderState,
    context: MenuItemCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    entity: MenuItemCategory,
    state: RenderState,
    context: MenuItemCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setCategoryName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedCategoryItems = (
    value: MenuItemCategory["categoryItems"],
    entity: MenuItemCategory,
    state: RenderState,
    context: MenuItemCategoryRenderContext
) => {
    return <div>Menu Items ({value?.length || 0})</div>;
};
