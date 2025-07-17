import { Text } from "@mantine/core";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";
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
        <MantineComboBox<UnitOfMeasureCategory>
            totalOptions={unitOfMeasureCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
