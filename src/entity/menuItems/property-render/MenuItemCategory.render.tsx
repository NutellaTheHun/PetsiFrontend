import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItem, MenuItemCategory } from "../../entityTypes";

export type MenuItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemCategory>,
    _context: MenuItemCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<MenuItemCategory>,
    context: MenuItemCategoryRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    _statefulInstance: GenericStatefulEntity<MenuItemCategory>,
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
    statefulInstance: GenericStatefulEntity<MenuItemCategory>;
    context: MenuItemCategoryRenderContext;
};

export function MenuItemCategoryRender({
    entityProp,
    statefulInstance,
    context,
}: MenuItemCategoryRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemCategoryPropertyRenderer}
        />
    );
}
