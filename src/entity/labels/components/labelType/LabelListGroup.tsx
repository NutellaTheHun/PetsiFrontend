import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { LabelType } from "../../../entityTypes";
import {
    type LabelTypeCreateContext,
    type LabelTypeEditContext,
} from "../../hooks/useLabelTypeMutations";
import { LabelTypeRender } from "../../property-render/LabelType.render";

export interface LabelListGroupProps
    extends Omit<
        EntityListGroupContext<
            LabelType,
            LabelTypeEditContext,
            LabelTypeCreateContext
        >,
        "renderProperty"
    > {
    data: LabelType[];
    useEntityMutation: UseEntityMutationsReturn<
        LabelType,
        LabelTypeEditContext,
        LabelTypeCreateContext
    >;
    externalSelectedState: [LabelType | null, (e: LabelType | null) => void];
}

export function LabelListGroup(props: LabelListGroupProps) {
    return (
        <EntityListGroupFactory<
            LabelType,
            LabelTypeEditContext,
            LabelTypeCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <LabelTypeRender
                        entityProp="labelTypeName"
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
