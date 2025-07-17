import { Text } from "@mantine/core";
import { SearchbarDropdownSelection } from "../../../../lib/uiComponents/input/SearchbarDropdownSelection";
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
        <SearchbarDropdownSelection<Recipe>
            totalOptions={recipes}
            selectedOption={value}
            onOptionChange={onChange}
            searchProperty={"recipeName"}
        />
    );
}
