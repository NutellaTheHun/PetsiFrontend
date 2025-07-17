import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import { type EntityListGroupContext } from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import { NewEntityListGroupFactory } from "../../../../lib/entityUIDefinitions/NewEntityListGroupFactory";
import type { InventoryItemPackage } from "../../../entityTypes";
import {
    type InventoryItemPackageCreateContext,
    type InventoryItemPackageEditContext,
} from "../../hooks/useInventoryItemPackageMutations";
import { InventoryItemPackageRender } from "../../property-render/InventoryItemPackage.render";

export interface InventoryItemPackageListGroupProps
    extends Omit<
        EntityListGroupContext<
            InventoryItemPackage,
            InventoryItemPackageEditContext,
            InventoryItemPackageCreateContext
        >,
        "renderProperty"
    > {
    data: InventoryItemPackage[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryItemPackage,
        InventoryItemPackageEditContext,
        InventoryItemPackageCreateContext
    >;
    externalSelectedState: [
        InventoryItemPackage | null,
        (e: InventoryItemPackage | null) => void
    ];
}

export function InventoryItemPackageListGroup(
    props: InventoryItemPackageListGroupProps
) {
    return (
        <NewEntityListGroupFactory<
            InventoryItemPackage,
            InventoryItemPackageEditContext,
            InventoryItemPackageCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <InventoryItemPackageRender
                        entityProp="packageName"
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
