import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { RecipeSubCategory } from "../../../entityTypes";

type Props = {
    selectedSubCategory: RecipeSubCategory | null;
    onUpdateSubCategory: (subCategory: RecipeSubCategory | null) => void;
    recipeSubCategories: RecipeSubCategory[];
};

export function RecipeSubCategoryDropdown({
    selectedSubCategory,
    onUpdateSubCategory,
    recipeSubCategories,
}: Props) {
    if (recipeSubCategories.length === 0) {
        return <GenericValueDisplay value={"No recipe sub categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(
                recipeSubCategories,
                "subCategoryName"
            )}
            value={selectedSubCategory}
            onChange={onUpdateSubCategory}
        />
    );
}
