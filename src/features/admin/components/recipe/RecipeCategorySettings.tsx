import { useState } from "react";
import type { components } from "../../../../api-types";
import type {
    UpdateRecipeCategoryDto,
    UpdateRecipeSubcategoryDto,
} from "../../../../entity/entityTypes";
import { useRecipeCategories } from "../../../../entity/recipe/hooks/useRecipeCategories";
import { useRecipeSubCategories } from "../../../../entity/recipe/hooks/useRecipeSubCategories";
import { RecipeCategoryRender } from "../../../../entity/recipe/property-render/RecipeCategory.render";
import { RecipeSubCategoryRender } from "../../../../entity/recipe/property-render/RecipeSubCategory.render";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

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

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editCategoryValues, setEditCategoryValues] =
        useState<UpdateRecipeCategoryDto | null>(null);
    const [editSubCategoryValues, setEditSubCategoryValues] =
        useState<UpdateRecipeSubcategoryDto | null>(null);

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
            <GenericListGroup<RecipeCategory>
                items={categories}
                targetId={selectedCategoryId}
                editingId={editingId}
                onToggleEditId={setEditingId}
                onSetSelectId={setSelectedCategoryId}
                onAdd={(name) =>
                    createCategory.mutate({
                        body: { categoryName: name, subCategoryDtos: [] },
                    })
                }
                onDelete={(id) =>
                    deleteCategory.mutate({ params: { path: { id } } })
                }
                onUpdate={(id) =>
                    updateCategory.mutate({
                        params: { path: { id } },
                        body: { categoryName: name },
                    })
                }
                renderItem={(category) => (
                    <RecipeCategoryRender
                        entityProp="categoryName"
                        instance={category}
                        state={
                            selectedCategoryId === category.id
                                ? "edited"
                                : "normal"
                        }
                        context={{
                            setCategoryName: (name) => {
                                setEditCategoryValues({
                                    ...editCategoryValues,
                                    categoryName: name,
                                });
                            },
                        }}
                    />
                )}
            />
            <GenericListGroup<RecipeSubCategory>
                items={subCategories}
                targetId={selectedSubCategoryId}
                editingId={editingId}
                onToggleEditId={setEditingId}
                onSetSelectId={setSelectedSubCategoryId}
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
                onUpdate={(id) =>
                    updateSubCategory.mutate({
                        params: { path: { id } },
                        body: { subCategoryName: name },
                    })
                }
                renderItem={(subCategory) => (
                    <RecipeSubCategoryRender
                        entityProp="subCategoryName"
                        instance={subCategory}
                        state={
                            selectedSubCategoryId === subCategory.id
                                ? "edited"
                                : "normal"
                        }
                        context={{
                            setSubCategoryName: (name) => {
                                setEditSubCategoryValues({
                                    ...editSubCategoryValues,
                                    subCategoryName: name,
                                });
                            },
                        }}
                    />
                )}
            />
        </div>
    );
}
