import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    MenuItem,
    MenuItemContainerOptions,
    MenuItemContainerRule,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../components/menuItem/MenuItemSearchBarDropdown";

export type MenuItemContainerOptionsRenderContext = {
    setValidQuantity: (quantity: number) => void;
    setParentContainer: (id: number | null) => void;
    menuItems?: MenuItem[];
};

const renderedId = (
    value: number,
    _entity: MenuItemContainerOptions,
    _state: RenderState,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentContainer = (
    value: MenuItem,
    _entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id || ""}
                onChange={(e) => context.setParentContainer(Number(e))}
                menuItems={context.menuItems || []}
            />
        );
    }
    return (
        <GenericValueDisplay value={value?.itemName || "No parent container"} />
    );
};

const renderedContainerRules = (
    value: MenuItemContainerRule[],
    _entity: MenuItemContainerOptions,
    _state: RenderState,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length || 0} Container Rules`} />
    );
};

const renderedValidQuantity = (
    value: number,
    _entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setValidQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

export const menuItemContainerOptionsPropertyRenderer: PropertyRendererRecord<MenuItemContainerOptions> =
    {
        id: renderedId,
        parentContainer: renderedParentContainer,
        containerRules: renderedContainerRules,
        validQuantity: renderedValidQuantity,
    };

export type MenuItemContainerOptionsRenderProps = {
    entityProp: keyof MenuItemContainerOptions;
    instance: MenuItemContainerOptions;
    state: RenderState;
    context: MenuItemContainerOptionsRenderContext;
};

export function MenuItemContainerOptionsRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemContainerOptionsRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemContainerOptionsPropertyRenderer}
        />
    );
}
