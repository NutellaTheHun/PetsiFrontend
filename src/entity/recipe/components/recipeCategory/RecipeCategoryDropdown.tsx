import { Text } from "@mantine/core";
import { MantineComboBox } from "../../../../lib/uiComponents/input/MantineComboBox";
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
        <MantineComboBox<RecipeCategory>
            totalOptions={recipeCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
