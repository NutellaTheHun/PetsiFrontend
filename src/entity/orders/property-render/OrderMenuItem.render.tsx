import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    MenuItem,
    MenuItemSize,
    Order,
    OrderContainerItem,
    OrderMenuItem,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";
import { MenuItemSizeDropdown } from "../../menuItems/components/menuItemSize/MenuItemSizeDropdown";

export type OrderMenuItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setMenuItem: (id: number | null) => void;
    setSize: (id: number | null) => void;
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
};

const renderedId = (
    value: number,
    _entity: OrderMenuItem,
    _state: RenderState,
    _context: OrderMenuItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedOrder = (
    _value: Order,
    _entity: OrderMenuItem,
    _state: RenderState,
    _context: OrderMenuItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

const renderedMenuItem = (
    value: MenuItem,
    _entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id ?? null}
                onChange={(e) => context.setMenuItem(Number(e))}
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName || "No menu item"} />;
};

const renderedQuantity = (
    value: number,
    _entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedSize = (
    value: MenuItemSize,
    _entity: OrderMenuItem,
    state: RenderState,
    context: OrderMenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSizeDropdown
                selectedSizeId={value?.id ?? null}
                onUpdateSizeId={context.setSize}
                menuItemSizes={context.menuItemSizes ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name || "No size"} />;
};

const renderedOrderedContainerItems = (
    value: OrderContainerItem[],
    _entity: OrderMenuItem,
    _state: RenderState,
    _context: OrderMenuItemRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length || 0} container items`} />
    );
};

export const orderMenuItemPropertyRenderer: PropertyRendererRecord<OrderMenuItem> =
    {
        id: renderedId,
        order: renderedOrder,
        menuItem: renderedMenuItem,
        quantity: renderedQuantity,
        size: renderedSize,
        orderedContainerItems: renderedOrderedContainerItems,
    };

export type OrderMenuItemRenderProps = {
    entityProp: keyof OrderMenuItem;
    instance: OrderMenuItem;
    state: RenderState;
    context: OrderMenuItemRenderContext;
};

export function OrderMenuItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderMenuItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={orderMenuItemPropertyRenderer}
        />
    );
}
