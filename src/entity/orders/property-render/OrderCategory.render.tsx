import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Order, OrderCategory } from "../../entityTypes";

export type OrderCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: OrderCategory,
    _state: RenderState,
    _context: OrderCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    _entity: OrderCategory,
    state: RenderState,
    context: OrderCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setCategoryName(e);
                }}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedOrders = (
    value: Order[],
    _entity: OrderCategory,
    _state: RenderState,
    _context: OrderCategoryRenderContext
) => {
    // TODO Implement
    return <div>Orders ({value?.length || 0})</div>;
};

export const orderCategoryPropertyRenderer: PropertyRendererRecord<OrderCategory> =
    {
        id: renderedId,
        categoryName: renderedCategoryName,
        orders: renderedOrders,
    };

export type OrderCategoryRenderProps = {
    entityProp: keyof OrderCategory;
    instance: OrderCategory;
    state: RenderState;
    context: OrderCategoryRenderContext;
};

export function OrderCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: OrderCategoryRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={orderCategoryPropertyRenderer}
        />
    );
}
