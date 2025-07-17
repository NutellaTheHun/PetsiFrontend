import { NumberInput, Text } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import { DropdownSelection } from "../../../lib/uiComponents/input/DropdownSelection";
import { SearchbarDropdownSelection } from "../../../lib/uiComponents/input/SearchbarDropdownSelection";
import type {
    MenuItem,
    MenuItemSize,
    Order,
    OrderContainerItem,
    OrderMenuItem,
} from "../../entityTypes";

export type OrderMenuItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setMenuItem: (item: MenuItem) => void;
    setSize: (size: MenuItemSize) => void;
    setOrder?: (order: Order) => void; // Only for create context, not edit
};

export interface OrderMenuItemDataContext
    extends EntityDataContext<OrderMenuItem> {
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    _context: OrderMenuItemRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedOrder = (
    _value: Order,
    _statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    _context: OrderMenuItemRenderContext
) => {
    return <Text>{"Nothing to display"}</Text>;
};

const renderedMenuItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    context: OrderMenuItemRenderContext,
    dataContext?: OrderMenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <SearchbarDropdownSelection<MenuItem>
                selectedOption={value}
                onOptionChange={(menuItem) => context.setMenuItem(menuItem)}
                totalOptions={dataContext?.menuItems ?? []}
                searchProperty={"itemName"}
            />
        );
    }
    return <Text>{value?.itemName ?? "No menu item"}</Text>;
};

const renderedQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    context: OrderMenuItemRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => {
                    context.setQuantity(Number(e));
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedSize = (
    value: MenuItemSize,
    statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    context: OrderMenuItemRenderContext,
    dataContext?: OrderMenuItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<MenuItemSize>
                selectedOption={value}
                onOptionChange={context.setSize}
                totalOptions={dataContext?.menuItemSizes ?? []}
                labelKey={"name"}
            />
        );
    }
    return <Text>{value?.name ?? "No size"}</Text>;
};

const renderedOrderedContainerItems = (
    value: OrderContainerItem[],
    _statefulInstance: GenericStatefulEntity<OrderMenuItem>,
    _context: OrderMenuItemRenderContext
) => {
    return <Text>{`${value?.length ?? 0} container items`}</Text>;
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
    dataContext?: OrderMenuItemDataContext;
};

export function OrderMenuItemRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: OrderMenuItemRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderMenuItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
