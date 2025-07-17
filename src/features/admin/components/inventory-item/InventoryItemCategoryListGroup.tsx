import { useState } from "react";
import type { components } from "../../../../api-types";
import type { UpdateInventoryItemCategoryDto } from "../../../../entity/entityTypes";
import { useInventoryItemCategories } from "../../../../entity/inventoryItems/hooks/useInventoryItemCategories";
import { InventoryItemCategoryRender } from "../../../../entity/inventoryItems/property-render/InventoryItemCategory.render";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export function InventoryItemCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] =
        useState<UpdateInventoryItemCategoryDto | null>(null);

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
        <GenericListGroup<InventoryItemCategory>
            items={inventoryItemCategories}
            selectedIdState={[selectedId, setSelectedId]}
            editingIdState={[editingId, setEditingId]}
            onCreate={(name) =>
                createCategory.mutate({ body: { itemCategoryName: name } })
            }
            onDelete={(id) =>
                deleteCategory.mutate({ params: { path: { id } } })
            }
            onUpdate={(id) =>
                updateCategory.mutate({
                    params: { path: { id } },
                    body: { itemCategoryName: name },
                })
            }
            renderProperty={(category) => (
                <InventoryItemCategoryRender
                    entityProp="categoryName"
                    instance={category}
                    state={selectedId === category.id ? "edited" : "normal"}
                    context={{
                        setCategoryName: (name) => {
                            setEditValues({
                                ...editValues,
                                itemCategoryName: name,
                            });
                        },
                    }}
                />
            )}
        />
    );
}
