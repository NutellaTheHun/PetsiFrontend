import type { components } from "../../../../api-types";
import { useInventoryItemVendors } from "../../../../entity/hooks/useInventoryItemVendors";
import { GenericDropdownInput } from "../../../shared-components/table/render-cell-content/GenericDropdownInput";

type InventoryItemVendor = components["schemas"]["InventoryItemVendor"];

type Props = {
    selectedVendorId: number | null;
    onUpdateVendorId: (id: number | null) => void;
};

export function InventoryItemVendorDropdown({
    selectedVendorId: selectedId,
    onUpdateVendorId: setVendorId,
}: Props) {
    const { inventoryItemVendors } = useInventoryItemVendors();

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
