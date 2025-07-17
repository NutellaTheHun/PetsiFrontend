import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import { type EntityListGroupContext } from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import { NewEntityListGroupFactory } from "../../../../lib/entityUIDefinitions/NewEntityListGroupFactory";
import type { OrderCategory } from "../../../entityTypes";
import {
    type OrderCategoryCreateContext,
    type OrderCategoryEditContext,
} from "../../hooks/useOrderCategoryMutations";
import { OrderCategoryRender } from "../../property-render/OrderCategory.render";

export interface OrderCategoryListGroupProps
    extends Omit<
        EntityListGroupContext<
            OrderCategory,
            OrderCategoryEditContext,
            OrderCategoryCreateContext
        >,
        "renderProperty"
    > {
    data: OrderCategory[];
    useEntityMutation: UseEntityMutationsReturn<
        OrderCategory,
        OrderCategoryEditContext,
        OrderCategoryCreateContext
    >;
    externalSelectedState: [
        OrderCategory | null,
        (e: OrderCategory | null) => void
    ];
}

export function OrderCategoryListGroup(props: OrderCategoryListGroupProps) {
    return (
        <NewEntityListGroupFactory<
            OrderCategory,
            OrderCategoryEditContext,
            OrderCategoryCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <OrderCategoryRender
                        entityProp="categoryName"
                        statefulInstance={item}
                        context={
                            item.state === "create"
                                ? props.useEntityMutation.createContext
                                : props.useEntityMutation.editContext
                        }
                    />
                );
            }}
        />
    );
}
