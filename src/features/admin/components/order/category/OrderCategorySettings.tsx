import { useState } from "react";
import type { components } from "../../../../../api-types";
import type { UpdateOrderCategoryDto } from "../../../../../entity/entityTypes";
import { useOrderCategories } from "../../../../../entity/orders/hooks/useOrderCategories";
import { OrderCategoryRender } from "../../../../../entity/orders/property-render/OrderCategory.render";
import { GenericListGroup } from "../../../../../lib/generics/listGroup/GenericListGroup";

type OrderCategory = components["schemas"]["OrderCategory"];

export function OrderCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<UpdateOrderCategoryDto | null>(
        null
    );

    const {
        orderCategories,
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useOrderCategories();

    if (isLoading) return <p>Loading sizes...</p>;
    if (error) return <p>Error loading sizes: {String(error)}</p>;

    return (
        <GenericListGroup<OrderCategory>
            items={orderCategories}
            selectedIdState={[selectedId, setSelectedId]}
            editingIdState={[editingId, setEditingId]}
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
                <OrderCategoryRender
                    entityProp="categoryName"
                    instance={category}
                    state={selectedId === category.id ? "edited" : "normal"}
                    context={{
                        setCategoryName: (name) => {
                            setEditValues({
                                ...editValues,
                                categoryName: name,
                            });
                        },
                    }}
                />
            )}
        />
    );
}
