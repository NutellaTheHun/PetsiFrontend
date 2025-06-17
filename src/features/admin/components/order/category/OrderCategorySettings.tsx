import { useQueryClient } from "@tanstack/react-query";
import type { components } from "../../../../../api-types";
import { $api } from "../../../../../lib/app-client";
import { GenericListGroup } from "../../../../shared-components/list-group/GenericListGroup";

export function OrderCategorySettings() {
    type OrderCategory = components["schemas"]["OrderCategory"];

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/order-categories"
    );

    const categories = data?.items ?? [];

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/order-categories"],
        });

    // Create
    const createSize = $api.useMutation("post", "/order-categories", {
        onSuccess: refresh,
    });

    // Update
    const UpdateSize = $api.useMutation("patch", "/order-categories/{id}", {
        onSuccess: refresh,
    });

    // Delete
    const deleteSize = $api.useMutation("delete", "/order-categories/{id}", {
        onSuccess: refresh,
    });

    // ---
    if (isLoading) return <p>Loading sizes...</p>;
    if (error) return <p>Error loading sizes: {String(error)}</p>;

    return (
        <GenericListGroup<OrderCategory, "categoryName">
            title="Categories"
            items={categories}
            targetProp="categoryName"
            onAdd={(name) =>
                createSize.mutate({ body: { categoryName: name } })
            }
            onDelete={(id) => deleteSize.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) =>
                UpdateSize.mutate({
                    params: { path: { id } },
                    body: { categoryName: name },
                })
            }
        />
    );
}
