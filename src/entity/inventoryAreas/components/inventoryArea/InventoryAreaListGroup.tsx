import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { GenericStatefulEntity } from "../../../../lib/generics/GenericStatefulEntity";
import type { InventoryArea } from "../../../entityTypes";
import {
    type InventoryAreaCreateContext,
    type InventoryAreaEditContext,
} from "../../hooks/useInventoryAreaMutations";

export interface InventoryAreaListGroupProps
    extends EntityListGroupContext<
        InventoryArea,
        InventoryAreaEditContext,
        InventoryAreaCreateContext
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
    renderItem: (
        item: GenericStatefulEntity<InventoryArea>,
        context: {
            editContext: InventoryAreaEditContext;
            createContext: InventoryAreaCreateContext;
        }
    ) => React.ReactNode;
}

export function InventoryAreaListGroup(props: InventoryAreaListGroupProps) {
    return (
        <EntityListGroupFactory<
            InventoryArea,
            InventoryAreaEditContext,
            InventoryAreaCreateContext
        >
            {...props}
        />
    );
}
