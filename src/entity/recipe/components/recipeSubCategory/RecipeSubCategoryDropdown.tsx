import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
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
        return <Text>No recipe sub categories found</Text>;
    }
    return (
        <DropdownSelection<RecipeSubCategory>
            totalOptions={recipeSubCategories}
            selectedOption={selectedSubCategory}
            onOptionChange={onUpdateSubCategory}
            labelKey={"subCategoryName"}
        />
    );
}
