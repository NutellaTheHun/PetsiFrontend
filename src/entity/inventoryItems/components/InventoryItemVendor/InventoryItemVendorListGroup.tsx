import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { InventoryItemVendor } from "../../../entityTypes";
import {
    type InventoryItemVendorCreateContext,
    type InventoryItemVendorEditContext,
} from "../../hooks/useInventoryItemVendorMutations";
import { InventoryItemVendorRender } from "../../property-render/InventoryItemVendor.render";

export interface InventoryItemVendorListGroupProps
    extends Omit<
        EntityListGroupContext<
            InventoryItemVendor,
            InventoryItemVendorEditContext,
            InventoryItemVendorCreateContext
        >,
        "renderProperty"
    > {
    data: InventoryItemVendor[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryItemVendor,
        InventoryItemVendorEditContext,
        InventoryItemVendorCreateContext
    >;
    externalSelectedState: [
        InventoryItemVendor | null,
        (e: InventoryItemVendor | null) => void
    ];
}

export function InventoryItemVendorListGroup(
    props: InventoryItemVendorListGroupProps
) {
    return (
        <EntityListGroupFactory<
            InventoryItemVendor,
            InventoryItemVendorEditContext,
            InventoryItemVendorCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <InventoryItemVendorRender
                        entityProp="vendorName"
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
