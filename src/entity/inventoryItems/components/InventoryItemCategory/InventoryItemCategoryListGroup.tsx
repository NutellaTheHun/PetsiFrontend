import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";

import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { InventoryItemCategory } from "../../../entityTypes";
import {
    type InventoryItemCategoryCreateContext,
    type InventoryItemCategoryEditContext,
} from "../../hooks/useInventoryItemCategoryMutations";
import { InventoryItemCategoryRender } from "../../property-render/InventoryItemCategory.render";

export interface InventoryItemCategoryListGroupProps
    extends Omit<
        EntityListGroupContext<
            InventoryItemCategory,
            InventoryItemCategoryEditContext,
            InventoryItemCategoryCreateContext
        >,
        "renderProperty"
    > {
    data: InventoryItemCategory[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryItemCategory,
        InventoryItemCategoryEditContext,
        InventoryItemCategoryCreateContext
    >;
    externalSelectedState: [
        InventoryItemCategory | null,
        (e: InventoryItemCategory | null) => void
    ];
}

export function InventoryItemCategoryListGroup(
    props: InventoryItemCategoryListGroupProps
) {
    return (
        <EntityListGroupFactory<
            InventoryItemCategory,
            InventoryItemCategoryEditContext,
            InventoryItemCategoryCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <InventoryItemCategoryRender
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
