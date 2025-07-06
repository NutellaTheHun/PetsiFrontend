import { useState } from "react";
import type { components } from "../../../../api-types";
import { InventoryAreaCountNewForm } from "../../../../entity/inventoryAreas/components/inventoryAreaCount/InventoryAreaCountNewForm";
import { InventoryAreaCountTable } from "../../../../entity/inventoryAreas/components/inventoryAreaCount/InventoryAreaCountTable";

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

    return (
        <div className="container">
            {selectedAreaId && (
                <div className="alert alert-info mb-3">
                    <strong>Filtered by:</strong>{" "}
                    {inventoryAreas.find((area) => area.id === selectedAreaId)
                        ?.areaName || `Area ID: ${selectedAreaId}`}
                </div>
            )}
            <InventoryAreaCountTable
                inventoryCounts={inventoryAreaCounts}
                externalSelectEntity={targetId}
                externalSetSelectId={setTargetId}
                sortKey={sortKey}
                sortDirection={sortDirection}
                setSortKey={setSortKey}
                setSortDirection={setSortDirection}
                createInventoryAreaCount={createInventoryAreaCount}
                updateInventoryAreaCount={updateInventoryAreaCount}
                deleteInventoryAreaCount={deleteInventoryAreaCount}
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
