import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";

type MenuItemCategory = components["schemas"]["MenuItemCategory"];

export type MenuItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: MenuItemCategory,
    _state: RenderState,
    _context: MenuItemCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    _entity: MenuItemCategory,
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
    _entity: MenuItemCategory,
    _state: RenderState,
    _context: MenuItemCategoryRenderContext
) => {
    // TODO Implement
    return <div>Menu Items ({value?.length || 0})</div>;
};

export const menuItemCategoryPropertyRenderer: PropertyRendererRecord<MenuItemCategory> =
    {
        id: renderedId,
        categoryName: renderedCategoryName,
        categoryItems: renderedCategoryItems,
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
