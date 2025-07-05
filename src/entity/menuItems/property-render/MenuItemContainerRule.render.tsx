import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    MenuItem,
    MenuItemContainerOptions,
    MenuItemContainerRule,
    MenuItemSize,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../components/menuItem/MenuItemSearchBarDropdown";
import { MenuItemSizeDropdownCheckbox } from "../components/menuItemSize/MenuItemSizeDropdownCheckbox";

export type MenuItemContainerRuleRenderContext = {
    setValidItem: (id: number | null) => void;
    setValidSizes: (sizes: number[]) => void;
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentContainerOption = (
    _value: MenuItemContainerOptions,
    _statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display here"} />;
};

const renderedValidItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    context: MenuItemContainerRuleRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) =>
                    context.setValidItem(menuItem?.id ?? null)
                }
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No valid item"} />;
};

const renderedValidSizes = (
    value: MenuItemSize[],
    statefulInstance: GenericStatefulEntity<MenuItemContainerRule>,
    context: MenuItemContainerRuleRenderContext
) => {
    if (isEditState(statefulInstance)) {
        // make sure this is in sync with the renderedValidItem?
        return (
            <MenuItemSizeDropdownCheckbox
                selectedSizeIds={value?.map((size) => size.id) ?? []}
                onUpdateSizeIds={(sizes) => context.setValidSizes(sizes)}
                menuItemSizes={context.menuItemSizes ?? []}
            />
        );
    }
    return <div>Valid Sizes ({value?.length ?? 0})</div>;
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
};

export function MenuItemContainerRuleRender({
    entityProp,
    statefulInstance,
    context,
}: MenuItemContainerRuleRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemContainerRulePropertyRenderer}
        />
    );
}
