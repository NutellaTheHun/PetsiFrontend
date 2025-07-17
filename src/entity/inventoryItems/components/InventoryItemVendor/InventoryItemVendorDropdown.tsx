import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
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
        return <Text>No inventory item vendors found</Text>;
    }
    return (
        <DropdownSelection<InventoryItemVendor>
            totalOptions={inventoryItemVendors}
            selectedOption={selectedVendor}
            onOptionChange={onUpdateVendor}
            labelKey={"vendorName"}
        />
    );
}
