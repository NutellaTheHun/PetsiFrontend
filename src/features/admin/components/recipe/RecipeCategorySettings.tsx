import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type RecipeCategory = components["schemas"]["RecipeCategory"];
type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export function RecipeCategorySettings() {
    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/recipe-categories",
        {
            params: {
                query: {
                    relations: ["subCategories"],
                },
            },
        }
    );

    const categories = data?.items ?? [];

    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
        null
    );
    const selectedCategory = categories.find(
        (c) => c.id === selectedCategoryId
    );

    const subCategories = selectedCategory?.subCategories ?? [];

    const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<
        number | null
    >(null);

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: [
                "get",
                "/recipe-categories",
                { params: { query: { relations: ["subCategories"] } } },
            ],
        });

    // Create
    const createCategory = $api.useMutation("post", "/recipe-categories", {
        onSuccess: refresh,
    });

    const createSubCategory = $api.useMutation(
        "post",
        "/recipe-sub-categories",
        {
            onSuccess: refresh,
        }
    );

    // Update
    const updateCategory = $api.useMutation(
        "patch",
        "/recipe-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const updateSubCategory = $api.useMutation(
        "patch",
        "/recipe-sub-categories/{id}",
        { onSuccess: refresh }
    );

    // Delete
    const deleteCategory = $api.useMutation(
        "delete",
        "/recipe-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    const deleteSubCategory = $api.useMutation(
        "delete",
        "/recipe-sub-categories/{id}",
        { onSuccess: refresh }
    );

    // ---
    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {String(error)}</p>;

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
