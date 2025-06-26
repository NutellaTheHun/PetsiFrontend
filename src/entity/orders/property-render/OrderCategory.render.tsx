import type { components } from "../../../api-types";
import { GenericInput } from "../../../lib/generics/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../lib/generics/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type OrderCategory = components["schemas"]["OrderCategory"];

export type OrderCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: OrderCategory,
    _state: RenderState,
    _context: OrderCategoryRenderContext
) => {
    return <GenericValue value={value} />;
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
    return <GenericValue value={value} />;
};

const renderedOrders = (
    value: OrderCategory["orders"],
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
