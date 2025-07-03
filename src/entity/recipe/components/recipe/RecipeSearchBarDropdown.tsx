import {
    createDropdownOptions,
    GenericSearchBarDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericSearchBarDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Recipe } from "../../../entityTypes";

interface RecipeSearchBarDropdownProps {
    value: Recipe | null;
    onChange: (value: Recipe) => void;
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    recipes: Recipe[];
}

export function RecipeSearchBarDropdown({
    value,
    onChange,
    readOnly = false,
    className = "",
    placeholder = "Search recipes...",
    disabled = false,
    recipes,
}: RecipeSearchBarDropdownProps) {
    if (recipes?.length === 0) {
        return <GenericValueDisplay value={"No recipes found"} />;
    }
    return (
        <GenericSearchBarDropdownInput<Recipe>
            value={value}
            onChange={onChange}
            options={createDropdownOptions(recipes, "recipeName")}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
