import { useState } from "react";
import type { components } from "../../../../api-types";
import { useUnitOfMeasureCategories } from "../../../../entity/unitOfMeasure/hooks/useUnitOfMeasureCategories";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type UnitOfMeasureCategory = components["schemas"]["UnitOfMeasureCategory"];

export function UnitOfMeasureCategorySettings() {
    const {
        categories,
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useUnitOfMeasureCategories();

    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {String(error)}</p>;

    return (
        <GenericListGroup<UnitOfMeasureCategory, "categoryName">
            title="Categories"
            items={categories}
            targetProp="categoryName"
            selectedId={selectedId}
            onSetSelectId={setSelectedId}
            onAdd={(name) =>
                createCategory.mutate({ body: { categoryName: name } })
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
    );
}
