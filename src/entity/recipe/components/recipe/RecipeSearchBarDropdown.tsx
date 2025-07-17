import { Text } from "@mantine/core";
import { MantineAutoComplete } from "../../../../lib/uiComponents/input/MantineAutoComplete";
import type { Recipe } from "../../../entityTypes";

interface RecipeSearchBarDropdownProps {
    value: Recipe | null;
    onChange: (value: Recipe) => void;
    recipes: Recipe[];
}

export function RecipeSearchBarDropdown({
    value,
    onChange,
    recipes,
}: RecipeSearchBarDropdownProps) {
    if (recipes?.length === 0) {
        return <Text>No recipes found</Text>;
    }
    return (
        <MantineAutoComplete<Recipe>
            totalOptions={recipes}
            selectedOption={value}
            onOptionChange={onChange}
            searchProperty={"recipeName"}
        />
    );
}
