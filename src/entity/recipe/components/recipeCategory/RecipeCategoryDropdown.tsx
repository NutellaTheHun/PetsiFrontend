import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
import type { RecipeCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: RecipeCategory | null;
    onUpdateCategory: (category: RecipeCategory | null) => void;
    recipeCategories: RecipeCategory[];
};

export function RecipeCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    recipeCategories,
}: Props) {
    if (recipeCategories.length === 0) {
        return <Text>No recipe categories found</Text>;
    }
    return (
        <DropdownSelection<RecipeCategory>
            totalOptions={recipeCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
