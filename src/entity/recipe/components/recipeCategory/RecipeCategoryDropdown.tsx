import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { RecipeCategory } from "../../../entityTypes";

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
    recipeCategories: RecipeCategory[];
};

export function RecipeCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
    recipeCategories,
}: Props) {
    if (recipeCategories.length === 0) {
        return <GenericValueDisplay value={"No recipe categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={recipeCategories.map((category: RecipeCategory) => ({
                id: category.id,
                label: category.categoryName,
            }))}
            value={selectedId}
            onChange={(categoryId: number | string) =>
                setCategoryId(Number(categoryId))
            }
        />
    );
}
