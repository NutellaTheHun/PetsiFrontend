import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { InventoryItemVendor } from "../../../entityTypes";

type Props = {
    selectedVendor: InventoryItemVendor | null;
    onUpdateVendor: (vendor: InventoryItemVendor | null) => void;
    inventoryItemVendors: InventoryItemVendor[];
};

export function InventoryItemVendorDropdown({
    selectedVendor,
    onUpdateVendor,
    inventoryItemVendors,
}: Props) {
    if (inventoryItemVendors.length === 0) {
        return (
            <GenericValueDisplay value={"No inventory item vendors found"} />
        );
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(inventoryItemVendors, "vendorName")}
            value={selectedVendor}
            onChange={onUpdateVendor}
        />
    );
}
