import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { MenuItemSize } from "../../../entityTypes";

interface MenuItemSizeDropdownProps {
    selectedSizeId: number | null;
    onUpdateSizeId: (id: number | null) => void;
    menuItemSizes: MenuItemSize[];
    disabled?: boolean;
}

export function MenuItemSizeDropdown({
    selectedSizeId,
    onUpdateSizeId,
    menuItemSizes,
    disabled = false,
}: MenuItemSizeDropdownProps) {
    if (menuItemSizes.length === 0) {
        return <GenericValueDisplay value="No menu item sizes found" />;
    }

    return (
        <GenericDropdownInput
            value={selectedSizeId}
            onChange={(sizeId) => onUpdateSizeId(Number(sizeId))}
            options={menuItemSizes.map((size: MenuItemSize) => ({
                id: size.id,
                label: size.name,
            }))}
            placeholder="Select Size"
            disabled={disabled}
            className="border rounded px-2 py-1"
        />
    );
}
