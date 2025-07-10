import type { components } from "../../../../api-types";
import {
    GenericDropdownCheckbox,
    createDropdownOptions,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownCheckbox";

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
    placeholder = "Select sizes...",
}: Props) {
    const options = createDropdownOptions(menuItemSizes, "name");

    return (
        <GenericDropdownCheckbox
            selectedValues={selectedSizes}
            onUpdateValues={onUpdateSizes}
            options={options}
            placeholder={placeholder}
        />
    );
}
