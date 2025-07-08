import { useState } from "react";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import {
    setStatefulData,
    type GenericStatefulEntity,
} from "../../../../lib/generics/GenericStatefulEntity";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import type { InventoryArea, InventoryAreaCount } from "../../../entityTypes";
import { useInventoryAreaCountMutations } from "../../hooks/useInventoryAreaCountMutations";
import type { InventoryAreaCountSortKey } from "../../hooks/useInventoryAreaItems";
import {
    InventoryAreaCountRender,
    type InventoryAreaCountRenderContext,
} from "../../property-render/InventoryAreaCount.render";

type Props = {
    inventoryCounts: InventoryAreaCount[];
    inventoryAreas: InventoryArea[];
    selectEntityState?: [
        InventoryAreaCount | null,
        (entity: InventoryAreaCount | null) => void
    ];
    sortKey: InventoryAreaCountSortKey;
    sortDirection: SortDirection;
    setSortKey: (key: InventoryAreaCountSortKey) => void;
    setSortDirection: (direction: SortDirection) => void;
};

export function InventoryAreaCountTable({
    inventoryCounts,
    inventoryAreas,
    selectEntityState,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
}: Props) {
    const [selectedEntity, setSelectedEntity] =
        selectEntityState ?? useState<InventoryAreaCount | null>(null);

    const {
        editContext,
        editInstance,
        setEditInstance,
        createContext,
        createInstance,
        setCreateInstance,
        resetEditValues,
        resetCreateValues,
        createEntity,
        updateEntity,
        deleteEntity,
    } = useInventoryAreaCountMutations();

    const statefulInventoryAreaCounts = setStatefulData(
        inventoryCounts,
        editInstance,
        selectedEntity?.id ?? null,
        editInstance?.id ?? null
    );

    const validSortKeys: InventoryAreaCountSortKey[] = [
        "countDate",
        "inventoryArea",
    ];

    const handleAdd = () => {
        if (createInstance) {
            createEntity();
            resetCreateValues();
        }
    };

    const handleUpdate = () => {
        updateEntity();
        resetEditValues();
    };

    const handleDelete = (id: number) => {
        deleteEntity(id);
    };

    // Maps the edit and create instance setters from the mutation hook to the render context functions
    // Also provides the inventory areas for the dropdown
    const editContextHandler: InventoryAreaCountRenderContext = {
        setInventoryArea: (area) => {
            editContext.setInventoryArea(area);
        },
        inventoryAreas: inventoryAreas,
    };
    const createContextHandler: InventoryAreaCountRenderContext = {
        setInventoryArea: (area) => {
            createContext.setInventoryArea(area);
        },
        inventoryAreas: inventoryAreas,
    };

    const columns: GenericTableColumn<InventoryAreaCount>[] = [
        {
            key: "id",
            label: "Id",
            sortable: true,
            renderProperty: (
                entity: GenericStatefulEntity<InventoryAreaCount>
            ) => (
                <InventoryAreaCountRender
                    entityProp="id"
                    statefulInstance={entity}
                    context={
                        entity.state === "create"
                            ? createContextHandler
                            : editContextHandler
                    }
                />
            ),
        },
        {
            key: "inventoryArea",
            label: "Inventory Area",
            sortable: true,
            renderProperty: (
                entity: GenericStatefulEntity<InventoryAreaCount>
            ) => (
                <InventoryAreaCountRender
                    entityProp="inventoryArea"
                    statefulInstance={entity}
                    context={
                        entity.state === "create"
                            ? createContextHandler
                            : editContextHandler
                    }
                />
            ),
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
                            ? createContextHandler
                            : editContextHandler
                    }
                />
            ),
        },
    ];

    return (
        <GenericTable<InventoryAreaCount, InventoryAreaCountSortKey>
            data={statefulInventoryAreaCounts}
            columns={columns}
            validSortKeys={validSortKeys}
            selectEntityState={[selectedEntity, setSelectedEntity]}
            editEntityState={[editInstance, setEditInstance]}
            createEntityState={[createInstance, setCreateInstance]}
            sortByState={[sortKey, setSortKey]}
            sortDirectionState={[sortDirection, setSortDirection]}
            onCreate={handleAdd}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
        />
    );
}
