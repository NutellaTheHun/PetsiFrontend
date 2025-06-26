import { useState } from "react";
import type { components } from "../../../../api-types";
import { useInventoryItemCategories } from "../../../../entity/inventoryItems/hooks/useInventoryItemCategories";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export function InventoryItemCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const {
        inventoryItemCategories,
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useInventoryItemCategories();

    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {String(error)}</p>;

    return (
        <GenericListGroup<InventoryItemCategory, "categoryName">
            title="Categories"
            items={inventoryItemCategories}
            targetProp="categoryName"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAdd={(name) =>
                createCategory.mutate({ body: { itemCategoryName: name } })
            }
            onDelete={(id) =>
                deleteCategory.mutate({ params: { path: { id } } })
            }
            onUpdate={(id, name) =>
                updateCategory.mutate({
                    params: { path: { id } },
                    body: { itemCategoryName: name },
                })
            }
        />
    );
}
