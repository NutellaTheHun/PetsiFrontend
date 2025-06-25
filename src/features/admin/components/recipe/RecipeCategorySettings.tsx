import { useState } from "react";
import type { components } from "../../../../api-types";
import { useRecipeCategories } from "../../../../entity/hooks/Recipe/useRecipeCategories";
import { useRecipeSubCategories } from "../../../../entity/hooks/Recipe/useRecipeSubCategories";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type RecipeCategory = components["schemas"]["RecipeCategory"];
type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export function RecipeCategorySettings() {
    const {
        recipeCategories: categories,
        isLoading: isCategoriesLoading,
        error: categoriesError,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useRecipeCategories();

    const {
        recipeSubCategories: subCategories,
        isLoading: isSubCategoriesLoading,
        error: subCategoriesError,
        createSubCategory,
        updateSubCategory,
        deleteSubCategory,
    } = useRecipeSubCategories();

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );

    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
        number | null
    >(null);

    if (isCategoriesLoading) return <p>Loading categories...</p>;
    if (categoriesError)
        return <p>Error loading categories: {String(categoriesError)}</p>;

    if (isSubCategoriesLoading) return <p>Loading sub categories...</p>;
    if (subCategoriesError)
        return (
            <p>Error loading sub categories: {String(subCategoriesError)}</p>
        );

    return (
        <div>
            <GenericListGroup<RecipeCategory, "categoryName">
                title="Categories"
                items={categories}
                targetProp="categoryName"
                selectedId={selectedCategoryId}
                setSelectedId={setSelectedCategoryId}
                onAdd={(name) =>
                    createCategory.mutate({
                        body: { categoryName: name, subCategoryDtos: [] },
                    })
                }
                onDelete={(id) =>
                    deleteCategory.mutate({ params: { path: { id } } })
                }
                onUpdate={(id, name) =>
                    updateCategory.mutate({
                        params: { path: { id } },
                        body: { categoryName: name },
                    })
                }
            />
            <GenericListGroup<RecipeSubCategory, "subCategoryName">
                title="Sub categories"
                items={subCategories}
                targetProp="subCategoryName"
                selectedId={selectedSubCategoryId}
                setSelectedId={setSelectedSubCategoryId}
                onAdd={(name) => {
                    if (!selectedCategoryId) return;
                    createSubCategory.mutate({
                        body: {
                            subCategoryName: name,
                            parentCategoryId: selectedCategoryId,
                        },
                    });
                }}
                onDelete={(id) =>
                    deleteSubCategory.mutate({ params: { path: { id } } })
                }
                onUpdate={(id, name) =>
                    updateSubCategory.mutate({
                        params: { path: { id } },
                        body: { subCategoryName: name },
                    })
                }
            />
        </div>
    );
}
