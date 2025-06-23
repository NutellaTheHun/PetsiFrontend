import { useState } from "react";
import type { components } from "../../../../api-types";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";
import { GenericDropdownInput } from "../../../shared-components/table/render-cell-content/GenericDropdownInput";
import { GenericInput } from "../../../shared-components/table/render-cell-content/GenericInput";
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
    setSortKey: (key: "countDate" | "inventoryArea" | "id") => void;
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

    const handleValueChange = (
        key: keyof UpdateInventoryAreaCountDto,
        value: number
    ) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
    };

    const columns: GenericTableColumn<InventoryAreaCount>[] = [
        {
            key: "id",
            label: "Id",
            sortable: true,
            editable: false,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    readOnly={readonly}
                />
            ),
        },
        {
            key: "inventoryArea",
            label: "Inventory Area",
            sortable: true,
            editable: false,
            render: (row, readonly) => (
                <GenericDropdownInput
                    key={String(row.id)}
                    options={inventoryAreas.map((area) => ({
                        id: area.id,
                        label: area.areaName,
                    }))}
                    value={
                        editValues?.inventoryAreaId ??
                        row.inventoryArea?.id ??
                        null
                    }
                    onChange={(areaId) =>
                        handleValueChange("inventoryAreaId", Number(areaId))
                    }
                    readOnly={readonly}
                    placeholder={row.inventoryArea?.areaName ?? "No area"}
                />
            ),
        },
        {
            key: "countDate",
            label: "Count Date",
            sortable: true,
            editable: false,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="text"
                    value={row.countDate}
                    readOnly={readonly}
                />
            ),
        },
    ];

    const handleHeaderClick = (key: keyof InventoryAreaCount) => {
        // Only allow sorting by valid backend fields
        const validSortKeys: ("countDate" | "inventoryArea" | "id")[] = [
            "countDate",
            "inventoryArea",
            "id",
        ];
        if (!validSortKeys.includes(key as any)) return;

        if (key === sortKey) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortKey(key as "countDate" | "inventoryArea" | "id");
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
                onHeaderClick={handleHeaderClick}
                sortBy={sortKey}
                sortDirection={sortDirection as "ASC" | "DESC"}
                onSetSelected={setTargetId}
                onDeleteRow={(id) =>
                    deleteInventoryAreaCount.mutate({
                        params: { path: { id } },
                    })
                }
                onUpdateRow={(id) => {
                    if (editValues) {
                        updateInventoryAreaCount.mutate({
                            params: { path: { id } },
                            body: editValues,
                        });
                    }
                }}
            />
            <div>
                <InventoryAreaCountNewForm
                    inventoryAreas={inventoryAreas}
                    onSubmit={(data) =>
                        createInventoryAreaCount.mutate({ body: data })
                    }
                />
            </div>
        </div>
    );
}
