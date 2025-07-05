import { useState } from "react";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";
import type {
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../../entityTypes";
import {
    InventoryAreaCountRender,
    type InventoryAreaCountRenderContext,
} from "../../property-render/InventoryAreaCount.render";

type Props = {
    inventoryAreaCounts: InventoryAreaCount[];
    targetId: number | null;
    setTargetId: (id: number | null) => void;
    sortKey: string;
    sortDirection: string;
    setSortKey: (key: "countDate" | "inventoryArea") => void;
    setSortDirection: (direction: "ASC" | "DESC") => void;
    createInventoryAreaCount: any;
    updateInventoryAreaCount: any;
    deleteInventoryAreaCount: any;
};

export function InventoryAreaCountTable({
    inventoryAreaCounts,
    targetId,
    setTargetId,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
    //createInventoryAreaCount,
    updateInventoryAreaCount,
    deleteInventoryAreaCount,
}: Props) {
    const [editValues, setEditValues] =
        useState<UpdateInventoryAreaCountDto | null>(null);

    // A flag to indicate if the targetId is being edited or is selected
    //const [isEdit, setIsEdit] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setEditingId(null);
            setEditValues(null);
        } else {
            setEditingId(id);
            const rowToEdit = inventoryAreaCounts.find((row) => row.id === id);
            if (!rowToEdit) return;
            setEditValues({
                inventoryAreaId: rowToEdit.inventoryArea?.id ?? null,
            });
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setEditingId(null);
        if (editValues) {
            setEditValues(null);
        }
    };

    const handleHeaderClick = (key: keyof InventoryAreaCount) => {
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
    };

    const context: InventoryAreaCountRenderContext = {
        setArea: (area) => {
            if (area) {
                setEditValues({ inventoryAreaId: area.id });
            } else {
                setEditValues(null);
            }
        },
    };

    const columns: GenericTableColumn<InventoryAreaCount>[] = [
        {
            key: "id",
            label: "Id",
            sortable: true,
            render: (
                row: InventoryAreaCount,
                isEditing: boolean,
                targetId: number | null
            ) => (
                <InventoryAreaCountRender
                    entityProp="id"
                    currentInstance={row}
                    editInstance={isEditing ? row : null}
                    targetId={targetId}
                    editingId={editingId}
                    context={context}
                />
            ),
        },
        {
            key: "inventoryArea",
            label: "Inventory Area",
            sortable: true,
            render: (row: InventoryAreaCount, isEditing, targetId) => (
                <InventoryAreaCountRender
                    entityProp="inventoryArea"
                    currentInstance={row}
                    editInstance={isEditing ? row : null}
                    targetId={targetId}
                    editingId={editingId}
                    context={context}
                />
            ),
        },
        {
            key: "countDate",
            label: "Count Date",
            sortable: true,
            render: (row: InventoryAreaCount, isEditing, targetId) => (
                <InventoryAreaCountRender
                    entityProp="countDate"
                    currentInstance={row}
                    editInstance={isEditing ? row : null}
                    targetId={targetId}
                    editingId={editingId}
                    context={context}
                />
            ),
        },
    ];

    return (
        <GenericTable<InventoryAreaCount>
            data={inventoryAreaCounts}
            columns={columns}
            targetId={targetId}
            editingId={editingId}
            onSetEdit={setEdit}
            sortBy={sortKey}
            sortDirection={sortDirection as "ASC" | "DESC"}
            onSetSelected={setSelect}
            onHeaderClick={handleHeaderClick}
            onDeleteRow={(id) =>
                deleteInventoryAreaCount.mutate({
                    params: { path: { id } },
                })
            }
            onUpdateRow={(id) => {
                if (editValues) {
                    updateInventoryAreaCount.mutate(
                        {
                            params: { path: { id } },
                            body: editValues,
                        },
                        {
                            onSuccess: () => {
                                setEdit(null);
                                setSelect(null);
                            },
                            onError: (error: any) => {
                                // Optionally handle errors here
                                console.error("Update failed:", error);
                            },
                        }
                    );
                }
            }}
        />
    );
}
