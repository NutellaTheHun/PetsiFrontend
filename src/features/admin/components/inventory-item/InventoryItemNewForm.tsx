import { useState } from "react";
import type { components } from "../../../../api-types";
import { useInventoryItemPackages } from "../../../../entity/hooks/useInventoryItemPackages";
import { useUnitOfMeasures } from "../../../../entity/hooks/useUnitOfMeasures";
import { InventoryItemCategoryDropdown } from "./InventoryItemCategoryDropdown";
import { InventoryItemVendorDropdown } from "./InventoryItemVendorDropdown";

// Types

type CreateInventoryItemDto = components["schemas"]["CreateInventoryItemDto"];

type Props = {
    onSubmit: (data: CreateInventoryItemDto) => void;
};

export function InventoryItemNewForm({ onSubmit }: Props) {
    // Main item fields
    const [itemName, setItemName] = useState("");
    const [categoryId, setCategoryId] = useState<number | null>(null);
    const [vendorId, setVendorId] = useState<number | null>(null);

    // Item size fields (single for now, could be extended to multiple)
    const [measureUnitId, setMeasureUnitId] = useState<number | null>(null);
    const [measureAmount, setMeasureAmount] = useState<number>(0);
    const [inventoryPackageId, setInventoryPackageId] = useState<number | null>(
        null
    );
    const [cost, setCost] = useState<number>(0);

    // Fetch dropdown data
    const { inventoryItemPackages } = useInventoryItemPackages();
    const { unitOfMeasures } = useUnitOfMeasures();

    // Validation
    const isFormValid =
        itemName.trim() !== "" &&
        categoryId !== null &&
        vendorId !== null &&
        measureUnitId !== null &&
        measureAmount > 0 &&
        inventoryPackageId !== null &&
        cost > 0;

    const handleSubmit = () => {
        if (!isFormValid) return;
        const data: CreateInventoryItemDto = {
            itemName,
            inventoryItemCategoryId: categoryId!,
            vendorId: vendorId!,
            itemSizeDtos: [
                {
                    mode: "create",
                    measureUnitId: measureUnitId!,
                    measureAmount,
                    inventoryPackageId: inventoryPackageId!,
                    cost,
                },
            ],
        };
        onSubmit(data);
        // Reset form
        setItemName("");
        setCategoryId(null);
        setVendorId(null);
        setMeasureUnitId(null);
        setMeasureAmount(0);
        setInventoryPackageId(null);
        setCost(0);
    };

    return (
        <div>
            <label>Create new inventory item</label>
            <div className="d-flex gap-2 flex-wrap">
                <input
                    type="text"
                    className="form-control-sm"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                />
                <InventoryItemCategoryDropdown
                    selectedCategoryId={categoryId}
                    onUpdateCategoryId={setCategoryId}
                />
                <InventoryItemVendorDropdown
                    selectedVendorId={vendorId}
                    onUpdateVendorId={setVendorId}
                />
                {/* Item Size Subform */}
                <select
                    className="form-control-sm"
                    value={measureUnitId ?? ""}
                    onChange={(e) =>
                        setMeasureUnitId(Number(e.target.value) || null)
                    }
                >
                    <option value="">Unit of Measure</option>
                    {unitOfMeasures?.map((uom: any) => (
                        <option key={uom.id} value={uom.id}>
                            {uom.name} ({uom.abbreviation})
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    className="form-control-sm"
                    placeholder="Amount"
                    value={measureAmount}
                    onChange={(e) => setMeasureAmount(Number(e.target.value))}
                    min={0}
                />
                <select
                    className="form-control-sm"
                    value={inventoryPackageId ?? ""}
                    onChange={(e) =>
                        setInventoryPackageId(Number(e.target.value) || null)
                    }
                >
                    <option value="">Package</option>
                    {inventoryItemPackages?.map((pkg: any) => (
                        <option key={pkg.id} value={pkg.id}>
                            {pkg.packageName}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    className="form-control-sm"
                    placeholder="Cost"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    min={0}
                    step={0.01}
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
