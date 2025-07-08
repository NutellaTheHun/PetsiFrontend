import { useState } from "react";
import type { MenuItemCategory } from "../../../../../entity/entityTypes";
import { useMenuItemCategories } from "../../../../../entity/menuItems/hooks/useMenuItemCategories";
import { MenuItemCategoryRender } from "../../../../../entity/menuItems/property-render/MenuItemCategory.render";
import { GenericListGroup } from "../../../../../lib/generics/listGroup/GenericListGroup";

export function MenuItemCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<MenuItemCategory | null>();

    const {
        menuItemCategories,
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useMenuItemCategories();

    // ---
    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {String(error)}</p>;

    return (
        <GenericListGroup<MenuItemCategory>
            items={menuItemCategories}
            selectedIdState={[selectedId, setSelectedId]}
            editingIdState={[editingId, setEditingId]}
            onCreate={(name) =>
                createCategory.mutate({ body: { categoryName: name } })
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
            renderProperty={(category) => (
                <MenuItemCategoryRender
                    entityProp="categoryName"
                    currentInstance={category}
                    editInstance={editValues}
                    targetId={selectedId}
                    editingId={editingId}
                    context={{
                        setCategoryName: (name) => {
                            editValues
                                ? setEditValues({
                                      ...editValues,
                                      categoryName: name,
                                  })
                                : setEditValues({
                                      id: category.id,
                                      categoryName: name,
                                      categoryItems: category.categoryItems,
                                  });
                        },
                    }}
                />
            )}
        />
    );
}
