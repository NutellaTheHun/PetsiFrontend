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
    OrderContainerItem,
    OrderMenuItem,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../../menuItems/components/menuItem/MenuItemSearchBarDropdown";
import { MenuItemSizeDropdown } from "../../menuItems/components/menuItemSize/MenuItemSizeDropdown";

export type OrderContainerItemRenderContext = {
    setQuantity: (quantity: number) => void;
    setContainedItem: (id: number | null) => void;
    setContainedItemSize: (id: number | null) => void;
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
};

const renderedId = (
    value: number,
    _entity: OrderContainerItem,
    _state: RenderState,
    _context: OrderContainerItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentOrderItem = (
    _value: OrderMenuItem,
    _entity: OrderContainerItem,
    _state: RenderState,
    _context: OrderContainerItemRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

const renderedContainedItem = (
    value: MenuItem,
    _entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id ?? null}
                onChange={(e) => context.setContainedItem(Number(e))}
                menuItems={context.menuItems ?? []}
            />
        );
    }
    return (
        <GenericValueDisplay value={value?.itemName || "No contained item"} />
    );
};

const renderedContainedItemSize = (
    value: MenuItemSize,
    _entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSizeDropdown
                selectedSizeId={value?.id ?? null}
                onUpdateSizeId={context.setContainedItemSize}
                menuItemSizes={context.menuItemSizes ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name || "No size"} />;
};

const renderedQuantity = (
    value: number,
    _entity: OrderContainerItem,
    state: RenderState,
    context: OrderContainerItemRenderContext
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
    instance: OrderContainerItem;
    state: RenderState;
    context: OrderContainerItemRenderContext;
};

export function OrderContainerItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderContainerItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={orderContainerItemPropertyRenderer}
        />
    );
}
