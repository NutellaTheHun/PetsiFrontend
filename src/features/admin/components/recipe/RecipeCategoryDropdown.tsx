import type { components } from "../../../../api-types";
import { useRecipeCategories } from "../../../../entity/hooks/Recipe/useRecipeCategories";
import { GenericDropdownInput } from "../../../shared-components/table/render-cell-content/GenericDropdownInput";

type RecipeCategory = components["schemas"]["RecipeCategory"];

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
};

export function RecipeCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
}: Props) {
    const { recipeCategories = [] } = useRecipeCategories();

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
