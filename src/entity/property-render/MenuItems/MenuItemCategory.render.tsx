import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

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

export const menuItemCategoryPropertyRenderer: PropertyRendererRecord<MenuItemCategory> =
    {
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemCategoryPropertyRenderer}
        />
    );
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
