import type { components } from "../../../../api-types";
import { MultiSelectCheckbox } from "../../../../lib/uiComponents/input/MantineMultiSelectCheckbox";

type MenuItemSize = components["schemas"]["MenuItemSize"];

type Props = {
    selectedSizes: MenuItemSize[];
    onUpdateSizes: (sizes: MenuItemSize[]) => void;
    menuItemSizes: MenuItemSize[];
    placeholder?: string;
};

export function MenuItemSizeDropdownCheckbox({
    selectedSizes,
    onUpdateSizes,
    menuItemSizes,
}: Props) {
    //const options = createDropdownOptions(menuItemSizes, "name");

    return (
        <MultiSelectCheckbox
            totalOptions={menuItemSizes}
            selectedOptions={selectedSizes}
            labelKey={"name"}
            onCheckboxChange={onUpdateSizes}
        />
    );
}
