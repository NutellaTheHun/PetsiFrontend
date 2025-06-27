import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemVendor } from "../../../entityTypes";

type Props = {
    selectedVendorId: number | null;
    onUpdateVendorId: (id: number | null) => void;
    inventoryItemVendors: InventoryItemVendor[];
};

export function InventoryItemVendorDropdown({
    selectedVendorId: selectedId,
    onUpdateVendorId: setVendorId,
    inventoryItemVendors,
}: Props) {
    if (inventoryItemVendors.length === 0) {
        return (
            <GenericValueDisplay value={"No inventory item vendors found"} />
        );
    }
    return (
        <GenericDropdownInput
            options={inventoryItemVendors.map(
                (vendor: InventoryItemVendor) => ({
                    id: vendor.id,
                    label: vendor.vendorName,
                })
            )}
            value={selectedId}
            onChange={(vendorId) => setVendorId(Number(vendorId))}
        />
    );
}
