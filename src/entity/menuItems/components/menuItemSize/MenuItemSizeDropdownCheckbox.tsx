import type { components } from "../../../../api-types";
import { DropdownCheckboxSelection } from "../../../../lib/uiComponents/input/DropdownCheckboxSelection";

type MenuItemSize = components["schemas"]["MenuItemSize"];

type Props = {
    selectedSizes: MenuItemSize[];
    onUpdateSizes: (sizes: MenuItemSize[]) => void;
    menuItemSizes: MenuItemSize[];
};

export function MenuItemSizeDropdownCheckbox({
    selectedSizes,
    onUpdateSizes,
    menuItemSizes,
}: Props) {
    return (
        <DropdownCheckboxSelection
            totalOptions={menuItemSizes}
            selectedOptions={selectedSizes}
            labelKey={"name"}
            onCheckboxChange={onUpdateSizes}
        />
    );
}
