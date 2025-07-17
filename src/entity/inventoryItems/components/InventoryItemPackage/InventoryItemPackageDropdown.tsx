import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
import type { InventoryItemPackage } from "../../../entityTypes";

type Props = {
    selectedPackage: InventoryItemPackage | null;
    onUpdatePackage: (pkg: InventoryItemPackage | null) => void;
    inventoryItemPackages: InventoryItemPackage[];
};

export function InventoryItemPackageDropdown({
    selectedPackage,
    onUpdatePackage,
    inventoryItemPackages,
}: Props) {
    if (inventoryItemPackages.length === 0) {
        return <Text>No inventory item packages found</Text>;
    }
    return (
        <DropdownSelection<InventoryItemPackage>
            totalOptions={inventoryItemPackages}
            selectedOption={selectedPackage}
            onOptionChange={onUpdatePackage}
            labelKey={"packageName"}
        />
    );
}
