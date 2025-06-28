import { useState } from "react";
import type { components } from "../../../../../api-types";
import { useMenuItemCategories } from "../../../../../entity/menuItems/hooks/useMenuItemCategories";
import { GenericListGroup } from "../../../../../lib/generics/listGroup/GenericListGroup";

type MenuItemCategory = components["schemas"]["MenuItemCategory"];

export function MenuItemCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

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
        <GenericListGroup<MenuItemCategory, "categoryName">
            title="Categories"
            items={menuItemCategories}
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
