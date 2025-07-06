import { useState } from "react";
import {
    setStatefulData,
    type GenericStatefulEntity,
} from "../../../../lib/generics/GenericStatefulEntity";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import type { SortDirection } from "../../../../lib/generics/UseGenericEntity";
import type { InventoryAreaCount } from "../../../entityTypes";
import { useInventoryAreaCountMutations } from "../../hooks/useInventoryAreaCountMutations";
import type { InventoryAreaCountSortKey } from "../../hooks/useInventoryAreaItems";
import {
    InventoryAreaCountRender,
    type InventoryAreaCountRenderContext,
} from "../../property-render/InventoryAreaCount.render";

type Props = {
    data: InventoryAreaCount[];
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
    data: inventoryAreaCounts,
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
        inventoryAreaCounts,
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

    /*const handleHeaderClick = (key: keyof InventoryAreaCount) => {
        // Only allow sorting by valid backend fields
        const validSortKeys: ("countDate" | "inventoryArea")[] = [
            "countDate",
            "inventoryArea",
        ];
        if (!validSortKeys.includes(key as any)) return;

        if (key === sortKey) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortKey(key as "countDate" | "inventoryArea");
            setSortDirection("ASC");
        }
    };*/

    const context: InventoryAreaCountRenderContext = {
        setInventoryArea: (area) => {
            editContext.setInventoryArea(area);
        },
    };

    const columns: GenericTableColumn<InventoryAreaCount>[] = [
        {
            key: "id",
            label: "Id",
            sortable: true,
            render: (row: GenericStatefulEntity<InventoryAreaCount>) => (
                <InventoryAreaCountRender
                    entityProp="id"
                    statefulInstance={row}
                    context={context}
                />
            ),
        },
        {
            key: "inventoryArea",
            label: "Inventory Area",
            sortable: true,
            render: (row: GenericStatefulEntity<InventoryAreaCount>) => (
                <InventoryAreaCountRender
                    entityProp="inventoryArea"
                    statefulInstance={row}
                    context={context}
                />
            ),
        },
        {
            key: "countDate",
            label: "Count Date",
            sortable: true,
            render: (row: GenericStatefulEntity<InventoryAreaCount>) => (
                <InventoryAreaCountRender
                    entityProp="countDate"
                    statefulInstance={row}
                    context={context}
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
