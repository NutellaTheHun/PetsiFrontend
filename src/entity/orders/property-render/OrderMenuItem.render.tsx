import {
    GenericEntityRenderer,
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
    setSize: (size: MenuItemSize | null) => void;
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    _context: OrderMenuItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedOrder = (
    _value: Order,
    _statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    _context: OrderMenuItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

const renderedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    context: OrderMenuItemRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) =>
                    context.setMenuItem(menuItem?.id ?? null)
                }
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No menu item"} />;
};

const renderedQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    context: OrderMenuItemRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    context: OrderMenuItemRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSizeDropdown
                selectedSize={value ?? null}
                onUpdateSize={context.setSize}
                menuItemSizes={context.menuItemSizes ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name ?? "No size"} />;
};

const renderedOrderedContainerItems = (
    value: OrderContainerItem[],
    _statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    _context: OrderMenuItemRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length ?? 0} container items`} />
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
    statefulInstance: GenericStatefulEntity<OrderMenuItem>;
    context: OrderMenuItemRenderContext;
};

export function OrderMenuItemRender({
    entityProp,
    statefulInstance,
    context,
}: OrderMenuItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderMenuItemPropertyRenderer}
        />
    );
}
