import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItemSize } from "../../../entityTypes";

interface MenuItemSizeDropdownProps {
    selectedSize: MenuItemSize | null;
    onUpdateSize: (size: MenuItemSize) => void;
    menuItemSizes: MenuItemSize[];
    disabled?: boolean;
}

export function MenuItemSizeDropdown({
    selectedSize,
    onUpdateSize,
    menuItemSizes,
    disabled = false,
}: MenuItemSizeDropdownProps) {
    if (menuItemSizes.length === 0) {
        return <GenericValueDisplay value="No menu item sizes found" />;
    }

    return (
        <GenericDropdownInput
            value={selectedSize}
            onChange={onUpdateSize}
            options={createDropdownOptions(menuItemSizes, "name")}
            placeholder="Select Size"
            disabled={disabled}
            className="border rounded px-2 py-1"
        />
    );
}
