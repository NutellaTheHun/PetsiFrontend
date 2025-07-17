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
    OrderContainerItem,
    OrderMenuItem,
} from "../../entityTypes";

export type OrderContainerItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setContainedItem: (item: MenuItem) => void;
    setContainedItemSize: (size: MenuItemSize) => void;
    setParentOrderItem?: (item: OrderMenuItem) => void; // Only for create context, not edit
};

export interface OrderContainerItemDataContext
    extends EntityDataContext<OrderContainerItem> {
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    _context: OrderContainerItemRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedParentOrderItem = (
    _value: OrderMenuItem,
    _statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    _context: OrderContainerItemRenderContext
) => {
    return <Text>{"Nothing to display"}</Text>;
};

const renderedContainedItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    context: OrderContainerItemRenderContext,
    dataContext?: OrderContainerItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <SearchbarDropdownSelection<MenuItem>
                selectedOption={value}
                onOptionChange={(menuItem) =>
                    context.setContainedItem(menuItem)
                }
                totalOptions={dataContext?.menuItems ?? []}
                searchProperty={"itemName"}
            />
        );
    }
    return <Text>{value?.itemName ?? "No contained item"}</Text>;
};

const renderedContainedItemSize = (
    value: MenuItemSize,
    statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    context: OrderContainerItemRenderContext,
    dataContext?: OrderContainerItemDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<MenuItemSize>
                selectedOption={value}
                onOptionChange={context.setContainedItemSize}
                totalOptions={dataContext?.menuItemSizes ?? []}
                labelKey={"name"}
            />
        );
    }
    return <Text>{value?.name ?? "No size"}</Text>;
};

const renderedQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    context: OrderContainerItemRenderContext
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

export const orderContainerItemPropertyRenderer: PropertyRendererRecord<OrderContainerItem> =
    {
        id: renderedId,
        parentOrderItem: renderedParentOrderItem,
        containedItem: renderedContainedItem,
        containedItemSize: renderedContainedItemSize,
        quantity: renderedQuantity,
    };

export type OrderContainerItemRenderProps = {
    entityProp: keyof OrderContainerItem;
    statefulInstance: GenericStatefulEntity<OrderContainerItem>;
    context: OrderContainerItemRenderContext;
    dataContext?: OrderContainerItemDataContext;
};

export function OrderContainerItemRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: OrderContainerItemRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderContainerItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
