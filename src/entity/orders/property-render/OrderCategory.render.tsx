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
import type { Order, OrderCategory } from "../../entityTypes";

export type OrderCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<OrderCategory>,
    _context: OrderCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<OrderCategory>,
    context: OrderCategoryRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    _statefulInstance: GenericStatefulEntity<OrderCategory>,
    _context: OrderCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length ?? 0} orders`} />;
};

export const orderCategoryPropertyRenderer: PropertyRendererRecord<OrderCategory> =
    {
        id: renderedId,
        categoryName: renderedCategoryName,
        orders: renderedOrders,
    };

export type OrderCategoryRenderProps = {
    entityProp: keyof OrderCategory;
    statefulInstance: GenericStatefulEntity<OrderCategory>;
    context: OrderCategoryRenderContext;
};

export function OrderCategoryRender({
    entityProp,
    statefulInstance,
    context,
}: OrderCategoryRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderCategoryPropertyRenderer}
        />
    );
}
