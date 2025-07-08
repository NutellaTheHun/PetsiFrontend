import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import {
    EntityTableFactory,
    type EntityTableContext,
} from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import type { GenericStatefulEntity } from "../../../../lib/generics/GenericStatefulEntity";
import type { InventoryArea, InventoryAreaCount } from "../../../entityTypes";
import type {
    InventoryAreaCountCreateContext,
    InventoryAreaCountEditContext,
} from "../../hooks/useInventoryAreaCountMutations";
import type { InventoryAreaCountSortKey } from "../../hooks/useInventoryAreaItems";
import { InventoryAreaCountRender } from "../../property-render/InventoryAreaCount.render";

export interface TestInventoryAreaCountTableProps
    extends Omit<
        EntityTableContext<
            InventoryAreaCount,
            InventoryAreaCountEditContext,
            InventoryAreaCountCreateContext,
            InventoryAreaCountSortKey
        >,
        "columns" | "validSortKeys"
    > {
    data: InventoryAreaCount[];
    useEntityMutation: UseEntityMutationsReturn<
        InventoryAreaCount,
        InventoryAreaCountEditContext,
        InventoryAreaCountCreateContext
    >;
    externalSelectedState: [
        InventoryAreaCount | null,
        (entity: InventoryAreaCount | null) => void
    ];
    sortKeyState: [
        InventoryAreaCountSortKey,
        (sortKey: InventoryAreaCountSortKey) => void
    ];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    inventoryAreas: InventoryArea[];
}

export function TestInventoryAreaCountTable(
    props: TestInventoryAreaCountTableProps
) {
    return (
        <EntityTableFactory<
            InventoryAreaCount,
            InventoryAreaCountEditContext,
            InventoryAreaCountCreateContext,
            InventoryAreaCountSortKey
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            sortKeyState={props.sortKeyState}
            sortDirectionState={props.sortDirectionState}
            validSortKeys={["countDate", "inventoryArea"]}
            columns={[
                {
                    key: "id",
                    label: "Id",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaCount>
                    ) => {
                        return (
                            <InventoryAreaCountRender
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
                    key: "inventoryArea",
                    label: "Inventory Area",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaCount>
                    ) => {
                        return (
                            <InventoryAreaCountRender
                                entityProp="inventoryArea"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                                dataContext={{
                                    inventoryAreas: props.inventoryAreas,
                                }}
                            />
                        );
                    },
                },
                {
                    key: "countDate",
                    label: "Count Date",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<InventoryAreaCount>
                    ) => (
                        <InventoryAreaCountRender
                            entityProp="countDate"
                            statefulInstance={entity}
                            context={
                                entity.state === "create"
                                    ? props.useEntityMutation.createContext
                                    : props.useEntityMutation.editContext
                            }
                        />
                    ),
                },
            ]}
        />
    );
}
