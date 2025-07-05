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
    _statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentContainer = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) =>
                    context.setParentContainer(menuItem?.id ?? null)
                }
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay value={value?.itemName ?? "No parent container"} />
    );
};

const renderedContainerRules = (
    value: MenuItemContainerRule[],
    _statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length ?? 0} Container Rules`} />
    );
};

const renderedValidQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<MenuItemContainerOptions>;
    context: MenuItemContainerOptionsRenderContext;
};

export function MenuItemContainerOptionsRender({
    entityProp,
    statefulInstance,
    context,
}: MenuItemContainerOptionsRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemContainerOptionsPropertyRenderer}
        />
    );
}
