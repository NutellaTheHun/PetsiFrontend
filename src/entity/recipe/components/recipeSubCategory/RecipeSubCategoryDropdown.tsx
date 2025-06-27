import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { RecipeSubCategory } from "../../../entityTypes";

type Props = {
    selectedSubCategoryId: number | null;
    onUpdateSubCategoryId: (id: number | null) => void;
    recipeSubCategories: RecipeSubCategory[];
};

export function RecipeSubCategoryDropdown({
    selectedSubCategoryId: selectedId,
    onUpdateSubCategoryId: setSubCategoryId,
    recipeSubCategories,
}: Props) {
    if (recipeSubCategories.length === 0) {
        return <GenericValueDisplay value={"No recipe sub categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={recipeSubCategories.map(
                (subCategory: RecipeSubCategory) => ({
                    id: subCategory.id,
                    label: subCategory.subCategoryName,
                })
            )}
            value={selectedId}
            onChange={(subCategoryId: number | string) =>
                setSubCategoryId(Number(subCategoryId))
            }
        />
    );
}
