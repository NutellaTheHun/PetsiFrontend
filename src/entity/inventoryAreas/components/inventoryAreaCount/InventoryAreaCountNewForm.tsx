import { useState } from "react";
import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/table/render-cell-content/GenericDropdownInput";

type CreateInventoryAreaCountDto =
    components["schemas"]["CreateInventoryAreaCountDto"];

type Props = {
    inventoryAreas: components["schemas"]["InventoryArea"][];
    onSubmit: (data: CreateInventoryAreaCountDto) => void;
};

export function InventoryAreaCountNewForm({ inventoryAreas, onSubmit }: Props) {
    const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);

    const isFormValid = selectedAreaId !== null && selectedAreaId > 0;

    const handleSubmit = () => {
        if (!isFormValid || !selectedAreaId) return;

        const createData: CreateInventoryAreaCountDto = {
            inventoryAreaId: selectedAreaId,
        };
        onSubmit(createData);
        setSelectedAreaId(null); // Reset form
    };

    return (
        <div>
            <label>Create new inventory area count</label>
            <div className="d-flex gap-2">
                <GenericDropdownInput
                    options={inventoryAreas.map((area) => ({
                        id: area.id,
                        label: area.areaName,
                    }))}
                    value={selectedAreaId}
                    onChange={(areaId) => setSelectedAreaId(Number(areaId))}
                    placeholder="Select inventory area..."
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    Create
                </button>
            </div>
        </div>
    );
}
