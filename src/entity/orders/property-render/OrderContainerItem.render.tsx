import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
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
    OrderContainerItem,
    OrderMenuItem,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";
import { MenuItemSizeDropdown } from "../../menuItems/components/menuItemSize/MenuItemSizeDropdown";

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
    return <GenericValueDisplay value={value} />;
};

const renderedParentOrderItem = (
    _value: OrderMenuItem,
    _statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    _context: OrderContainerItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

const renderedContainedItem = (
    value: MenuItem,
    statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    context: OrderContainerItemRenderContext,
    dataContext?: OrderContainerItemDataContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) => context.setContainedItem(menuItem)}
                menuItems={dataContext?.menuItems ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay value={value?.itemName ?? "No contained item"} />
    );
};

const renderedContainedItemSize = (
    value: MenuItemSize,
    statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    context: OrderContainerItemRenderContext,
    dataContext?: OrderContainerItemDataContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <MenuItemSizeDropdown
                selectedSize={value ?? null}
                onUpdateSize={context.setContainedItemSize}
                menuItemSizes={dataContext?.menuItemSizes ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name ?? "No size"} />;
};

const renderedQuantity = (
    value: number,
    statefulInstance: GenericStatefulEntity<OrderContainerItem>,
    context: OrderContainerItemRenderContext
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
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderContainerItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
