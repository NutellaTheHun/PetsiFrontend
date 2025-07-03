import {
    determineState,
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItem, MenuItemCategory } from "../../entityTypes";

export type MenuItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: MenuItemCategory,
    _state: RenderState,
    _context: MenuItemCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryItems = (
    value: MenuItem[],
    _entity: MenuItemCategory,
    _state: RenderState,
    _context: MenuItemCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} Menu Items`} />;
};

export const menuItemCategoryPropertyRenderer: PropertyRendererRecord<MenuItemCategory> =
    {
        id: renderedId,
        categoryName: renderedCategoryName,
        categoryItems: renderedCategoryItems,
    };

export type MenuItemCategoryRenderProps = {
    entityProp: keyof MenuItemCategory;
    currentInstance: MenuItemCategory;
    editInstance: MenuItemCategory | null | undefined;
    targetId: number | null;
    editingId: number | null;
    context: MenuItemCategoryRenderContext;
};

export function MenuItemCategoryRender({
    entityProp,
    currentInstance,
    editInstance,
    targetId,
    editingId,
    context,
}: MenuItemCategoryRenderProps) {
    const state = determineState(targetId, editingId, currentInstance.id);
    const entityInstance =
        state === "edited"
            ? editInstance
                ? { ...editInstance }
                : { ...currentInstance }
            : currentInstance;
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
