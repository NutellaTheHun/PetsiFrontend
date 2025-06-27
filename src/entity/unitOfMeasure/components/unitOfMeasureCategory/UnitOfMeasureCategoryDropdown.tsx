import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { UnitOfMeasureCategory } from "../../../entityTypes";

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
    unitOfMeasureCategories: UnitOfMeasureCategory[];
};

export function UnitOfMeasureCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
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
            options={unitOfMeasureCategories.map(
                (category: UnitOfMeasureCategory) => ({
                    id: category.id,
                    label: category.categoryName,
                })
            )}
            value={selectedId}
            onChange={(categoryId: number | string) =>
                setCategoryId(Number(categoryId))
            }
        />
    );
}
