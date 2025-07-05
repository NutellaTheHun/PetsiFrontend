import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
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
        return <GenericValueDisplay value={"No recipe categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(recipeCategories, "categoryName")}
            value={selectedCategory}
            onChange={onUpdateCategory}
        />
    );
}
