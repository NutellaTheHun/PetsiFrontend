import { useQueryClient } from "@tanstack/react-query";
import type { components } from "../../../../../api-types";
import { $api } from "../../../../../lib/app-client";
import { GenericListGroup } from "../../../../shared-components/list-group/GenericListGroup";

export function MenuItemCategorySettings() {
    type MenuItemCategory = components["schemas"]["MenuItemCategory"];

    const { data, isLoading, error } = $api.useQuery("get", "/menu-categories");

    const categories = data?.items ?? [];

    const queryClient = useQueryClient();

    const refresh = () => {
        queryClient.invalidateQueries({
            queryKey: ["get", "/menu-categories"],
        });
    };

    // Create
    const createCategory = $api.useMutation("post", "/menu-categories", {
        onSuccess: refresh,
    });
    // Update
    const updateCategory = $api.useMutation("patch", "/menu-categories/{id}", {
        onSuccess: refresh,
    });

    // Delete
    const deleteCategory = $api.useMutation("delete", "/menu-categories/{id}", {
        onSuccess: refresh,
    });

    // ---
    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {String(error)}</p>;

    return (
        <GenericListGroup<MenuItemCategory, "categoryName">
            title="Categories"
            items={categories}
            targetProp="categoryName"
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
