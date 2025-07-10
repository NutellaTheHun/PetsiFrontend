import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import {
    EntityTableFactory,
    type EntityTableContext,
} from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import type { GenericStatefulEntity } from "../../../../lib/generics/GenericStatefulEntity";
import type { InventoryAreaItem } from "../../../entityTypes";
import type { InventoryAreaItemEditContext } from "../../hooks/useInventoryAreaItemMutations";

import type { InventoryAreaItemCreateContext } from "../../hooks/useInventoryAreaItemMutations";
import type { InventoryAreaItemSortKey } from "../../hooks/useInventoryAreaItemsFindAll";
import { InventoryAreaItemRender } from "../../property-render/InventoryAreaItem.render";
export interface TestInventoryAreaItemTableProps
    extends Omit<
        EntityTableContext<
            InventoryAreaItem,
            InventoryAreaItemEditContext,
            InventoryAreaItemCreateContext,
            InventoryAreaItemSortKey
        >,
        "columns" | "validSortKeys"
    > {
    data: InventoryAreaItem[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryAreaItem,
        InventoryAreaItemEditContext,
        InventoryAreaItemCreateContext
    >;
    externalSelectedState: [
        InventoryAreaItem | null,
        (entity: InventoryAreaItem | null) => void
    ];
    sortKeyState: [
        InventoryAreaItemSortKey,
        (sortKey: InventoryAreaItemSortKey) => void
    ];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    // extra data for renderers
}

export function TestInventoryAreaItemTable(
    props: TestInventoryAreaItemTableProps
) {
    return (
        <EntityTableFactory<
            InventoryAreaItem,
            InventoryAreaItemEditContext,
            InventoryAreaItemCreateContext,
            InventoryAreaItemSortKey
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            sortKeyState={props.sortKeyState}
            sortDirectionState={props.sortDirectionState}
            validSortKeys={["countedItem", "amount", "id"]}
            columns={[
                {
                    key: "id",
                    label: "Id",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaItem>
                    ) => {
                        return (
                            <InventoryAreaItemRender
                                entityProp="id"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "countedItem",
                    label: "Counted Item",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaItem>
                    ) => {
                        return (
                            <InventoryAreaItemRender
                                entityProp="countedItem"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "amount",
                    label: "Amount",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaItem>
                    ) => {
                        return (
                            <InventoryAreaItemRender
                                entityProp="amount"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "countedItemSize",
                    label: "Counted Item Size",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaItem>
                    ) => {
                        return (
                            <InventoryAreaItemRender
                                entityProp="countedItemSize"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
            ]}
        />
    );
}
