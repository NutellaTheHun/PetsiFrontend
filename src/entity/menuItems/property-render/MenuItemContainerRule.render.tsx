import { Text } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MantineAutoComplete } from "../../../lib/uiComponents/input/MantineAutoComplete";
import { MultiSelectCheckbox } from "../../../lib/uiComponents/input/MantineMultiSelectCheckbox";
import type {
    MenuItem,
    MenuItemContainerOptions,
    MenuItemContainerRule,
    MenuItemSize,
} from "../../entityTypes";

export type MenuItemContainerRuleRenderContext = {
    setValidItem: (id: number | null) => void;
    setValidSizes: (sizes: MenuItemSize[]) => void;
};

export interface MenuItemContainerRuleDataContext
    extends EntityDataContext<MenuItemContainerRule> {
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedParentContainerOption = (
    _value: MenuItemContainerOptions,
    _statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <Text>"Nothing to display here"</Text>;
};

const renderedValidItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    context: MenuItemContainerRuleRenderContext,
    dataContext?: MenuItemContainerRuleDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineAutoComplete<MenuItem>
                totalOptions={dataContext?.menuItems ?? []}
                selectedOption={value}
                onOptionChange={(menuItem) =>
                    context.setValidItem(menuItem?.id ?? null)
                }
                searchProperty="itemName"
            />
        );
    }
    return <Text>{value?.itemName ?? "No valid item"}</Text>;
};

const renderedValidSizes = (
    value: MenuItemSize[],
    statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    context: MenuItemContainerRuleRenderContext,
    dataContext?: MenuItemContainerRuleDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MultiSelectCheckbox<MenuItemSize>
                totalOptions={dataContext?.menuItemSizes ?? []}
                selectedOptions={value}
                onCheckboxChange={context.setValidSizes}
                labelKey={"name"}
            />
        );
    }
    return <Text>Valid Sizes ({value?.length ?? 0})</Text>;
};

export const menuItemContainerRulePropertyRenderer: PropertyRendererRecord<MenuItemContainerRule> =
    {
        id: renderedId,
        parentContainerOption: renderedParentContainerOption,
        validItem: renderedValidItem,
        validSizes: renderedValidSizes,
    };

export type MenuItemContainerRuleRenderProps = {
    entityProp: keyof MenuItemContainerRule;
    statefulInstance: GenericStatefulEntity<MenuItemContainerRule>;
    context: MenuItemContainerRuleRenderContext;
    dataContext?: MenuItemContainerRuleDataContext;
};

export function MenuItemContainerRuleRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: MenuItemContainerRuleRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemContainerRulePropertyRenderer}
            dataContext={dataContext}
        />
    );
}
