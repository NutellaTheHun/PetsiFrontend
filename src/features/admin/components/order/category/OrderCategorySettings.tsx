import { useState } from "react";
import type { components } from "../../../../../api-types";
import { useOrderCategories } from "../../../../../entity/hooks/Orders/useOrderCategories";
import { GenericListGroup } from "../../../../shared-components/list-group/GenericListGroup";

type OrderCategory = components["schemas"]["OrderCategory"];

export function OrderCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

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
        <GenericListGroup<OrderCategory, "categoryName">
            title="Categories"
            items={orderCategories}
            targetProp="categoryName"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
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
