import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
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
        return (
            <GenericValueDisplay value={"No inventory item packages found"} />
        );
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(
                inventoryItemPackages,
                "packageName"
            )}
            value={selectedPackage}
            onChange={onUpdatePackage}
        />
    );
}
