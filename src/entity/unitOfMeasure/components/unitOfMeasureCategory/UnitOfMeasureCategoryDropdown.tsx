import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { UnitOfMeasureCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: UnitOfMeasureCategory | null;
    onUpdateCategory: (category: UnitOfMeasureCategory | null) => void;
    unitOfMeasureCategories: UnitOfMeasureCategory[];
};

export function UnitOfMeasureCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    unitOfMeasureCategories,
}: Props) {
    if (unitOfMeasureCategories.length === 0) {
        return (
            <GenericValueDisplay
                value={"No unit of measure categories found"}
            />
        );
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(
                unitOfMeasureCategories,
                "categoryName"
            )}
            value={selectedCategory}
            onChange={(category) => onUpdateCategory(category ?? null)}
        />
    );
}
