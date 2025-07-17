import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { UnitOfMeasureCategory } from "../../../entityTypes";
import {
    type UnitOfMeasureCategoryCreateContext,
    type UnitOfMeasureCategoryEditContext,
} from "../../hooks/useUnitOfMeasureCategoryMutations";
import { UnitOfMeasureCategoryRender } from "../../property-render/UnitOfMeasureCategory.render";

export interface UnitOfMeasureCategoryListGroupProps
    extends Omit<
        EntityListGroupContext<
            UnitOfMeasureCategory,
            UnitOfMeasureCategoryEditContext,
            UnitOfMeasureCategoryCreateContext
        >,
        "renderProperty"
    > {
    data: UnitOfMeasureCategory[];
    useEntityMutation: UseEntityMutationsReturn<
        UnitOfMeasureCategory,
        UnitOfMeasureCategoryEditContext,
        UnitOfMeasureCategoryCreateContext
    >;
    externalSelectedState: [
        UnitOfMeasureCategory | null,
        (e: UnitOfMeasureCategory | null) => void
    ];
}

export function UnitOfMeasureCategoryListGroup(
    props: UnitOfMeasureCategoryListGroupProps
) {
    return (
        <EntityListGroupFactory<
            UnitOfMeasureCategory,
            UnitOfMeasureCategoryEditContext,
            UnitOfMeasureCategoryCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <UnitOfMeasureCategoryRender
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
