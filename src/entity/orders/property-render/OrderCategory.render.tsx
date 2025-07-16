import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
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
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setCategoryName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
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
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderCategoryPropertyRenderer}
        />
    );
}
