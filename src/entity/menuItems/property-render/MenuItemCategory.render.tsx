import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { MenuItem, MenuItemCategory } from "../../entityTypes";

export type MenuItemCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemCategory>,
    _context: MenuItemCategoryRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<MenuItemCategory>,
    context: MenuItemCategoryRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setCategoryName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedCategoryItems = (
    value: MenuItem[],
    _statefulInstance: GenericStatefulEntity<MenuItemCategory>,
    _context: MenuItemCategoryRenderContext
) => {
    return <Text>{`${value?.length || 0} Menu Items`}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemCategoryPropertyRenderer}
        />
    );
}
