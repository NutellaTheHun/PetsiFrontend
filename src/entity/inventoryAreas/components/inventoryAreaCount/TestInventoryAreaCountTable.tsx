import { EntityTableFactory } from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import type { GenericStatefulEntity } from "../../../../lib/generics/GenericStatefulEntity";
import type { InventoryAreaCount } from "../../../entityTypes";
import type { InventoryAreaCountCreateContext, InventoryAreaCountEditContext } from "../../hooks/useInventoryAreaCountMutations";
import type { InventoryAreaCountSortKey } from "../../hooks/useInventoryAreaItems";
import { InventoryAreaCountRender } from "../../property-render/InventoryAreaCount.render";

export const TestInventoryAreaCountTable = EntityTableFactory<
    InventoryAreaCount,
    InventoryAreaCountEditContext,
    InventoryAreaCountCreateContext,
    InventoryAreaCountSortKey
>({
    editContext: {},
    createContext: {},
    validSortKeys: ["countDate", "inventoryArea"],
    columns: [
        {
            key: "id",
            label: "Id",
            sortable: true,
            renderProperty: (
                entity: GenericStatefulEntity<InventoryAreaCount>,
                context: { editContext: InventoryAreaCountEditContext, createContext: InventoryAreaCountCreateContext }
            ) => (
                <InventoryAreaCountRender
                    entityProp="id"
                    statefulInstance={entity}
                    context={
                        entity.state === "create"
                            ? context.createContext
                            : context.editContext
                    }
                />
            ),
        },
        {
            key: "inventoryArea",
            label: "Inventory Area",
            sortable: true,
            renderProperty: (
                entity: GenericStatefulEntity<InventoryAreaCount>,
                context: { editContext: InventoryAreaCountEditContext, createContext: InventoryAreaCountCreateContext }
            ) => (
                <InventoryAreaCountRender
                    entityProp="inventoryArea"
                    statefulInstance={entity}
                    context={
                        entity.state === "create"
                            ? context.createContext
                            : context.editContext
                    }
                />
            ),
        },
        {
            key: "countDate",
            label: "Count Date",
            sortable: true,
            renderProperty: (
                entity: GenericStatefulEntity<InventoryAreaCount>,
                context: { editContext: InventoryAreaCountEditContext, createContext: InventoryAreaCountCreateContext }
            ) => (
                <InventoryAreaCountRender
                    entityProp="countDate"
                    statefulInstance={entity}
                    context={
                        entity.state === "create"
                            ? context.createContext
                            : context.editContext
                    }
                />
            ),
        },
    ];
    
});