import { useState } from "react";
import type { components } from "../../../../api-types";
import {
    InventoryAreaCountRender,
    type InventoryAreaCountRenderContext,
} from "../../../../entity/property-render/InventoryAreaCount.render";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";
import { InventoryAreaCountNewForm } from "./InventoryAreaCountNewForm";

type InventoryAreaCount = components["schemas"]["InventoryAreaCount"];
type UpdateInventoryAreaCountDto =
    components["schemas"]["UpdateInventoryAreaCountDto"];
type InventoryArea = components["schemas"]["InventoryArea"];

type Props = {
    inventoryAreaCounts: InventoryAreaCount[];
    inventoryAreas: InventoryArea[];
    targetId: number | null;
    setTargetId: (id: number | null) => void;
    sortKey: string;
    sortDirection: string;
    setSortKey: (key: "countDate" | "inventoryArea") => void;
    setSortDirection: (direction: "ASC" | "DESC") => void;
    selectedAreaId: number | null;
    createInventoryAreaCount: any;
    updateInventoryAreaCount: any;
    deleteInventoryAreaCount: any;
};

export function InventoryAreaCountSettings({
    inventoryAreaCounts,
    inventoryAreas,
    targetId,
    setTargetId,
    sortKey,
    sortDirection,
    setSortKey,
    setSortDirection,
    selectedAreaId,
    createInventoryAreaCount,
    updateInventoryAreaCount,
    deleteInventoryAreaCount,
}: Props) {
    const [editValues, setEditValues] =
        useState<UpdateInventoryAreaCountDto | null>(null);

    const [isEdit, setIsEdit] = useState(false);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setIsEdit(false);
            setEditValues(null);
        } else {
            setIsEdit(true);
            const rowToEdit = inventoryAreaCounts.find((row) => row.id === id);
            if (!rowToEdit) return;
            setEditValues({
                inventoryAreaId: rowToEdit.inventoryArea?.id ?? null,
            });
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setIsEdit(false);
        if (editValues) {
            setEditValues(null);
        }
    };

    const setState = (
        targetId: number | null,
        rowId: number,
        isEdit: boolean
    ) => {
        if (targetId === rowId && isEdit) {
            return "edited";
        }
        if (targetId === rowId) {
            return "selected";
        }
        return "normal";
    };

    const handleValueChange = (
        key: keyof UpdateInventoryAreaCountDto,
        value: number
    ) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
    };

    const context: InventoryAreaCountRenderContext = {
        setAreaId: (id) => {
            if (id) {
                setEditValues({ inventoryAreaId: id });
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
                    instance={row}
                    state={setState(targetId, row.id, isEditing)}
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
                    instance={row}
                    state={setState(targetId, row.id, isEditing)}
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
                    instance={row}
                    state={setState(targetId, row.id, isEditing)}
                    context={context}
                />
            ),
        },
    ];

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

    return (
        <div className="container">
            {selectedAreaId && (
                <div className="alert alert-info mb-3">
                    <strong>Filtered by:</strong>{" "}
                    {inventoryAreas.find((area) => area.id === selectedAreaId)
                        ?.areaName || `Area ID: ${selectedAreaId}`}
                </div>
            )}
            <GenericTable
                data={inventoryAreaCounts}
                columns={columns}
                targetId={targetId}
                isEdit={isEdit}
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
            <div>
                <InventoryAreaCountNewForm
                    inventoryAreas={inventoryAreas}
                    onSubmit={(data) => {
                        createInventoryAreaCount.mutate({ body: data });
                        setEdit(null);
                        setSelect(null);
                    }}
                />
            </div>
        </div>
    );
}
