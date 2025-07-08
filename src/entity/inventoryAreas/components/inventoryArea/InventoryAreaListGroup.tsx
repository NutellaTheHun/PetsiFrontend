import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { InventoryArea } from "../../../entityTypes";
import {
    type InventoryAreaCreateContext,
    type InventoryAreaEditContext,
} from "../../hooks/useInventoryAreaMutations";
import { InventoryAreaRender } from "../../property-render/InventoryArea.render";

export interface InventoryAreaListGroupProps
    extends Omit<
        EntityListGroupContext<
            InventoryArea,
            InventoryAreaEditContext,
            InventoryAreaCreateContext
        >,
        "renderItem"
    > {
    data: InventoryArea[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryArea,
        InventoryAreaEditContext,
        InventoryAreaCreateContext
    >;
    externalSelectedState: [
        InventoryArea | null,
        (e: InventoryArea | null) => void
    ];
}

export function InventoryAreaListGroup(props: InventoryAreaListGroupProps) {
    return (
        <EntityListGroupFactory<
            InventoryArea,
            InventoryAreaEditContext,
            InventoryAreaCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item, context) => {
                return (
                    <InventoryAreaRender
                        entityProp="areaName"
                        statefulInstance={item}
                        context={
                            item.state === "create"
                                ? context.createContext
                                : context.editContext
                        }
                    />
                );
            }}
        />
    );
}
