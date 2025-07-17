import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import type { Order, OrderCategory } from "../../entityTypes";

export type OrderCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<OrderCategory>,
    _context: OrderCategoryRenderContext
) => {
    return <Text>{value}</Text>;
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
    return <Text>{`${value?.length ?? 0} orders`}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={orderCategoryPropertyRenderer}
        />
    );
}
