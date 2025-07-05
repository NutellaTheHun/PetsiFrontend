import { useState } from "react";
import { setStatefulData } from "../../../../lib/generics/GenericStatefulEntity";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";
import type { MenuItemCategory } from "../../../entityTypes";
import { useMenuItemCategoryMutations } from "../../hooks/useMenuItemCategoryMutations";
import { MenuItemCategoryRender } from "../../property-render/MenuItemCategory.render";

type Props = {
    menuItemCategories: MenuItemCategory[];
    externalSelectedState?: [
        MenuItemCategory | null,
        (category: MenuItemCategory | null) => void
    ];
    externalEditingState?: [
        MenuItemCategory | null,
        (category: MenuItemCategory | null) => void
    ];
};

export function MenuItemCategoryListGroup({
    menuItemCategories,
    externalSelectedState,
    externalEditingState,
}: Props) {
    const [selectedCategory, setSelectedCategory] =
        externalSelectedState ?? useState<MenuItemCategory | null>(null);
    const [editingCategory, setEditingCategory] =
        externalEditingState ?? useState<MenuItemCategory | null>(null);

    const {
        createInstance,
        editInstance,
        editContext,
        createEntity: createCategory,
        updateEntity: updateCategory,
        deleteEntity: deleteCategory,
    } = useMenuItemCategoryMutations();

    const statefulCategories = setStatefulData(
        menuItemCategories,
        selectedCategory?.id ?? null,
        editingCategory?.id ?? null
    );

    return (
        <GenericListGroup<MenuItemCategory>
            items={statefulCategories}
            selectedEntity={[selectedCategory, setSelectedCategory]}
            editingEntity={[editingCategory, setEditingCategory]}
            onAdd={(name) =>
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
            renderItem={(category) => (
                <MenuItemCategoryRender
                    entityProp="categoryName"
                    statefulInstance={category}
                    context={editContext}
                />
            )}
        />
    );
}
