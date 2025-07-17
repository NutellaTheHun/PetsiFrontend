import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import { type EntityListGroupContext } from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import { NewEntityListGroupFactory } from "../../../../lib/entityUIDefinitions/NewEntityListGroupFactory";
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
        "renderProperty"
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
        <NewEntityListGroupFactory<
            InventoryArea,
            InventoryAreaEditContext,
            InventoryAreaCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <InventoryAreaRender
                        entityProp="areaName"
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
