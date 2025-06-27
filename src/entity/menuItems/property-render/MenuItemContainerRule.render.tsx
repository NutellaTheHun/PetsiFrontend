import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
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
    _entity: MenuItemContainerRule,
    _state: RenderState,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentContainerOption = (
    _value: MenuItemContainerOptions,
    _entity: MenuItemContainerRule,
    _state: RenderState,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display here"} />;
};

const renderedValidItem = (
    value: MenuItem,
    _entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id || ""}
                onChange={(e) => context.setValidItem(Number(e))}
                menuItems={context.menuItems || []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No valid item"} />;
};

const renderedValidSizes = (
    value: MenuItemSize[],
    _entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    if (state === "edited") {
        // make sure this is in sync with the renderedValidItem?
        return (
            <MenuItemSizeDropdownCheckbox
                selectedSizeIds={value?.map((size) => size.id) || []}
                onUpdateSizeIds={(sizes) => context.setValidSizes(sizes)}
                menuItemSizes={context.menuItemSizes || []}
            />
        );
    }
    return <div>Valid Sizes ({value?.length || 0})</div>;
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
    instance: MenuItemContainerRule;
    state: RenderState;
    context: MenuItemContainerRuleRenderContext;
};

export function MenuItemContainerRuleRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemContainerRuleRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemContainerRulePropertyRenderer}
        />
    );
}
