import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import {
    EntityTableFactory,
    type EntityTableContext,
} from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import type {
    InventoryItem,
    InventoryItemCategory,
    InventoryItemVendor,
} from "../../../entityTypes";
import type {
    InventoryItemCreateContext,
    InventoryItemEditContext,
} from "../../hooks/useInventoryItemMutations";
import type { InventoryItemSortKey } from "../../hooks/useInventoryItemsFindAll";
import { RenderInventoryItemProperty } from "../../property-render/InventoryItem.render";

export interface InventoryItemTableProps
    extends Omit<
        EntityTableContext<
            InventoryItem,
            InventoryItemEditContext,
            InventoryItemCreateContext,
            InventoryItemSortKey
        >,
        "columns" | "validSortKeys"
    > {
    data: InventoryItem[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryItem,
        InventoryItemEditContext,
        InventoryItemCreateContext
    >;
    externalSelectedState: [
        InventoryItem | null,
        (entity: InventoryItem | null) => void
    ];
    sortKeyState: [
        InventoryItemSortKey,
        (sortKey: InventoryItemSortKey) => void
    ];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    inventoryItemCategories: InventoryItemCategory[];
    inventoryItemVendors: InventoryItemVendor[];
}

export function InventoryItemTable(props: InventoryItemTableProps) {
    return (
        <EntityTableFactory<
            InventoryItem,
            InventoryItemEditContext,
            InventoryItemCreateContext,
            InventoryItemSortKey
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            sortKeyState={props.sortKeyState}
            sortDirectionState={props.sortDirectionState}
            validSortKeys={["itemName", "category", "vendor", "id"]}
            columns={[
                {
                    key: "id",
                    label: "Id",
                    sortable: true,
                    renderProperty: (row) => (
                        <RenderInventoryItemProperty
                            entityProp="id"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
                {
                    key: "itemName",
                    label: "Item Name",
                    sortable: true,
                    renderProperty: (row) => (
                        <RenderInventoryItemProperty
                            entityProp="itemName"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
                {
                    key: "category",
                    label: "Category",
                    sortable: true,
                    renderProperty: (row) => (
                        <RenderInventoryItemProperty
                            entityProp="category"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                            dataContext={{
                                inventoryItemCategories:
                                    props.inventoryItemCategories,
                            }}
                        />
                    ),
                },
                {
                    key: "vendor",
                    label: "Vendor",
                    sortable: true,
                    renderProperty: (row) => (
                        <RenderInventoryItemProperty
                            entityProp="vendor"
                            statefulInstance={row}
                            context={
                                row.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                            dataContext={{
                                inventoryItemVendors:
                                    props.inventoryItemVendors,
                            }}
                        />
                    ),
                },
            ]}
        />
    );
}
