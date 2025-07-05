import { useState } from "react";
import type {
    CreateInventoryAreaCountDto,
    InventoryArea,
} from "../../../entityTypes";
import { InventoryAreaDropdown } from "../inventoryArea/InventoryAreaDropdown";

type Props = {
    inventoryAreas: InventoryArea[];
    onSubmit: (data: CreateInventoryAreaCountDto) => void;
};

export function InventoryAreaCountNewForm({ inventoryAreas, onSubmit }: Props) {
    const [selectedArea, setSelectedArea] = useState<InventoryArea | null>(
        null
    );

    const isFormValid = selectedArea !== null;

    const handleSubmit = () => {
        if (!isFormValid || !selectedArea) return;

        const createData: CreateInventoryAreaCountDto = {
            inventoryAreaId: selectedArea.id,
        };
        onSubmit(createData);
        setSelectedArea(null); // Reset form
    };

    return (
        <div>
            <label>Create new inventory area count</label>
            <div className="d-flex gap-2">
                <InventoryAreaDropdown
                    inventoryAreas={inventoryAreas}
                    selectedArea={selectedArea}
                    onUpdateArea={setSelectedArea}
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
