import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
import type { UnitOfMeasureCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: UnitOfMeasureCategory | null;
    onUpdateCategory: (category: UnitOfMeasureCategory) => void;
    unitOfMeasureCategories: UnitOfMeasureCategory[];
};

export function UnitOfMeasureCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    unitOfMeasureCategories,
}: Props) {
    if (unitOfMeasureCategories.length === 0) {
        return <Text>No unit of measure categories found</Text>;
    }
    return (
        <DropdownSelection<UnitOfMeasureCategory>
            totalOptions={unitOfMeasureCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
